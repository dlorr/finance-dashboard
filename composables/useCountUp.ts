import { ref, watch } from "vue";

export function useCountUp(target: () => number, duration = 800) {
  const display = ref(0);
  let animationFrame: number;

  const animate = (from: number, to: number, startTime: number) => {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    display.value = Math.round(from + (to - from) * eased);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(() =>
        animate(from, to, startTime),
      );
    } else {
      display.value = to;
    }
  };

  //   watch(
  //     target,
  //     (newVal, oldVal = 0) => {
  //       cancelAnimationFrame(animationFrame);
  //       animationFrame = requestAnimationFrame(() =>
  //         animate(oldVal, newVal, performance.now()),
  //       );
  //     },
  //     { immediate: true },
  //   );

  watch(
    target,
    (newVal, oldVal = 0) => {
      if (!import.meta.client) {
        // SSR fallback (no animation)
        display.value = newVal;
        return;
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() =>
        animate(oldVal, newVal, performance.now()),
      );
    },
    { immediate: true },
  );
  return { display };
}
