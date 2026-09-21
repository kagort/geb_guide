import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Hero: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return <div class={classNames(displayClass, "hero-banner")}></div>
}

Hero.css = `
.hero-banner {
  margin: -2rem -2rem 2rem -2rem;
  height: 220px;
  border-radius: 0 0 12px 12px;
  background:
    radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.10) 0, transparent 40%),
    radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.08) 0, transparent 45%),
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 2px, transparent 2px, transparent 14px),
    linear-gradient(120deg, var(--secondary) 0%, var(--tertiary) 100%);
  background-blend-mode: screen, screen, normal, normal;
}

@media (max-width: 600px) {
  .hero-banner {
    height: 140px;
    margin: -1rem -1rem 1.5rem -1rem;
  }
}
`

export default (() => Hero) satisfies QuartzComponentConstructor
