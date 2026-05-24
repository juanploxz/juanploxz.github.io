import { useEffect } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

let gsapRegistered = false;

function registerGsap(gsap, ScrollTrigger) {
  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
  }
}

export function useCinematicEffects() {
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let cancelled = false;
    let context;
    let scrollTriggerPlugin;
    const magneticCleanups = [];

    async function setupCinematicLayer() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      scrollTriggerPlugin = ScrollTrigger;
      registerGsap(gsap, ScrollTrigger);

      context = gsap.context(() => {
        gsap.utils.toArray("[data-cinematic]").forEach((section) => {
          const revealTargets = section.querySelectorAll(
            ".section-header, .project-filter-note"
          );

          if (!revealTargets.length) {
            return;
          }

          gsap.fromTo(
            revealTargets,
            {
              opacity: 0.9,
              y: 14,
              filter: "blur(2px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "none",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "top 56%",
                scrub: 0.6,
              },
            }
          );
        });

        gsap.utils.toArray("[data-parallax]").forEach((element) => {
          const depth = Number(element.dataset.parallax || 0.08);

          gsap.to(element, {
            y: () => -window.innerHeight * depth,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray("[data-magnetic]").forEach((element) => {
          const handlePointerMove = (event) => {
            const rect = element.getBoundingClientRect();
            const relX = event.clientX - rect.left - rect.width / 2;
            const relY = event.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
              x: relX * 0.2,
              y: relY * 0.22,
              duration: 0.35,
              ease: "power3.out",
            });
          };

          const handlePointerLeave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "elastic.out(1, 0.35)",
            });
          };

          element.addEventListener("pointermove", handlePointerMove);
          element.addEventListener("pointerleave", handlePointerLeave);
          magneticCleanups.push(() => {
            element.removeEventListener("pointermove", handlePointerMove);
            element.removeEventListener("pointerleave", handlePointerLeave);
          });
        });
      });

      ScrollTrigger.refresh();
    }

    setupCinematicLayer();

    return () => {
      cancelled = true;
      magneticCleanups.forEach((cleanup) => cleanup());
      context?.revert();
      scrollTriggerPlugin?.refresh();
    };
  }, [reducedMotion]);
}
