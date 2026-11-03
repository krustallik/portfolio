# Design notes

## Direction: an engineering fieldbook

The portfolio uses a calm, map-room vocabulary: measured lines, route nodes, short field labels, and images taken from the actual work. The custom route drawing in the hero is the one prominent illustration; it links application work, automation, and research without pretending to show a live system. The page keeps the recruiter route predictable: role and availability first, project evidence next, then education, skills, and contact.

I compared three visual directions before implementation:

| Direction | Visual language | Strength | Trade-off | Decision |
| --- | --- | --- | --- | --- |
| Editorial engineering fieldbook | Mineral paper, survey blue, fine linework, asymmetric project feature | Connects the map-based thesis work to the broader project set and gives screenshots room | Needs clear type and spacing to avoid looking like a printed report | Selected; linework only frames the content |
| Technical laboratory | Deep navy, dense data labels, compact modular panels | Signals systems work and could foreground diagrams | Risks reading as a dashboard and makes long case studies tiring | Rejected; dark navy appears in one section break |
| Experimental route atlas | Full-screen map motion, scroll-linked paths, interactive nodes | Memorable and directly related to location-aware software | Adds movement and complexity before visitors have seen the projects | Rejected; the hero diagram stays static |

The selected treatment uses general principles from developer portfolio case studies: keep the work legible, make navigation predictable, and make technical reasoning part of each project story. References reviewed: [Tarik Karahodžić’s personal-site case study](https://www.tarikkarahodzic.dev/projects/personal-site), [Isaac Rios’s portfolio rebuild and case study](https://jisaacrios.dev/), and [Jeremy Hayes’s portfolio case study](https://www.jeremymhayes.com/projects/portfolio-website). The layout and assets here are original and are not copied from those sites.

## Color tokens

| Token | Hex | Use |
| --- | --- | --- |
| Paper | #F1F0EA | Main canvas |
| Bright paper | #FAF9F5 | Project gallery and raised content |
| Ink | #182732 | Primary text |
| Quiet ink | #53616A | Supporting text |
| Survey blue | #315FC0 | Links, focus, and the hero route |
| Field marker | #D99B64 | Small directional markers |

Muted field colors frame the screenshots instead of competing with their varied application palettes. Contrast-critical elements use ink or blue against light surfaces; the dark approach section uses off-white text.

## Typography

- IBM Plex Sans Variable carries navigation, headings, and body copy. The large, tightly tracked hero title gives the page its editorial voice.
- IBM Plex Mono is reserved for short metadata such as locations, categories, and project annotations.
- Font files are bundled locally from npm packages. The page does not call a third-party font service at runtime.

Copy uses sentence case, short paragraphs, and direct verbs. Skill groups connect technologies to repository evidence instead of proficiency bars.

## Layout and content

- A 1216 px content measure keeps wide screenshots large while protecting paragraph line length.
- The desktop hero pairs the role statement with a custom route diagram. On small screens it becomes a stacked sequence.
- The first project gets a wide image-and-copy composition. Other projects use a two-column gallery; mobile switches to a single column.
- Case studies are separate /projects/:slug routes with direct source links, capability summaries, architecture notes, and limitations.
- The site does not display a CV action until a real PDF is added. GitHub is the only included contact channel because no public email or LinkedIn URL was verified.

## Motion and interaction

Motion is limited to one brief hero entrance, button feedback, and small image/card hover responses. Filtering is immediate and indicated with aria-pressed; the mobile menu exposes its state and closes after choosing a section. The prefers-reduced-motion preference disables animation and smooth scrolling. There are no scroll-linked effects, runtime GitHub requests, or WebGL.

## Responsive and accessible behavior

- Breakpoints at 1050, 760, and 460 px adjust the hero, project grid, skills layout, and navigation.
- The menu uses a labelled button with aria-expanded and aria-controls.
- A skip link, semantic landmarks, visible focus, descriptive image text, and heading order support keyboard and screen-reader use.
- Filters use native buttons and expose the selected state. Touch targets are at least 37 px for filters and 44 px for the menu toggle.

## Genuine project imagery

All six visual captures came from repository READMEs and were converted to WebP for local use. Their READMEs describe the captures as local runs with synthetic/demo seed data. Source images:

- [Streetlight map](https://raw.githubusercontent.com/krustallik/public-lighting-fault-reporting/master/docs/images/public-map-demo.png)
- [GymBeam Shifts manager](https://raw.githubusercontent.com/krustallik/GymbeamShifts/main/docs/images/admin-manager-dashboard.png)
- [Booktop storefront](https://raw.githubusercontent.com/krustallik/Marketplace/main/docs/images/homepage.jpg)
- [BodyCast dashboard](https://raw.githubusercontent.com/krustallik/body-model/main/docs/images/bodycast-dashboard.png)
- [Missing-data dataset chart](https://raw.githubusercontent.com/krustallik/missing-data-tabular-models/master/docs/images/dataset-overview.png)
- [Building management mobile app](https://raw.githubusercontent.com/krustallik/university-at-t-software-project/main/docs/images/mobile-buildings.png)
