import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"

interface GroupedBacklinksOptions {
  hideWhenEmpty: boolean
  // порядок групп и подписи — меняйте тексты под себя
  groups: { type: string; label: string }[]
  otherLabel: string
}

const defaultOptions: GroupedBacklinksOptions = {
  hideWhenEmpty: true,
  groups: [
    { type: "персоналия", label: "Люди" },
    { type: "концепт", label: "Концепты" },
    { type: "контекст", label: "Контекст" },
    { type: "диалог", label: "Диалоги" },
    { type: "глава", label: "Главы" },
  ],
  otherLabel: "Другое",
}

export default ((opts?: Partial<GroupedBacklinksOptions>) => {
  const options: GroupedBacklinksOptions = { ...defaultOptions, ...opts }

  const GroupedBacklinks: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))

    if (options.hideWhenEmpty && backlinkFiles.length === 0) {
      return null
    }

    // группируем по frontmatter.type
    const buckets = new Map<string, typeof backlinkFiles>()
    for (const f of backlinkFiles) {
      const type = (f.frontmatter?.type as string | undefined) ?? "__other__"
      if (!buckets.has(type)) buckets.set(type, [])
      buckets.get(type)!.push(f)
    }

    // порядок вывода: сначала известные группы в заданном порядке, потом всё остальное
    const orderedGroups = options.groups
      .map((g) => ({ label: g.label, files: buckets.get(g.type) ?? [] }))
      .filter((g) => g.files.length > 0)

    const knownTypes = new Set(options.groups.map((g) => g.type))
    const otherFiles = [...buckets.entries()]
      .filter(([type]) => !knownTypes.has(type))
      .flatMap(([, files]) => files)
    if (otherFiles.length > 0) {
      orderedGroups.push({ label: options.otherLabel, files: otherFiles })
    }

    return (
      <div class={classNames(displayClass, "backlinks", "grouped-backlinks")}>
        <h3>Обратные ссылки</h3>
        {orderedGroups.length > 0 ? (
          orderedGroups.map((group) => (
            <div class="backlink-group">
              <h4>{group.label}</h4>
              <ul class="overflow">
                {group.files.map((f) => (
                  <li>
                    <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                      {f.frontmatter?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul class="overflow">
            <li>Обратные ссылки отсутствуют</li>
          </ul>
        )}
      </div>
    )
  }

  GroupedBacklinks.css = style
  return GroupedBacklinks
}) satisfies QuartzComponentConstructor
