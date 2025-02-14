import{A as e}from"./C2Q_87oA.js";const u=(n,...o)=>{const i={...n};return Object.keys(i).forEach(a=>{o.includes(a)&&delete i[a]}),i},d=`# Svelte\r
\r
---\r
\r
[\`Svelte\`](https://svelte.dev/) is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members. Svelte is not a monolithic JavaScript library imported by applications: instead, Svelte compiles HTML templates to specialized code that manipulates the DOM directly, which may reduce the size of transferred files and give better client performance. Application code is also processed by the compiler, inserting calls to automatically recompute data and re-render UI elements when the data they depend on is modified. This also avoids the overhead associated with runtime intermediate representations, such as virtual DOM, unlike traditional frameworks (such as React and Vue) which carry out the bulk of their work at runtime, i.e. in the browser.\r
\r
The compiler itself is written in TypeScript. Its source code is licensed under MIT License and hosted on GitHub.\r
\r
<br/>\r
\r
Svelte is :\r
\r
- compiled : Svelte shifts as much work as possible out of the browser and into your build step. No more manual optimisations — just faster, more efficient apps.\r
- compact : Write breathtakingly concise components using languages you already know — HTML, CSS and JavaScript. Oh, and your application bundles will be tiny as well.\r
- complete : Built-in scoped styling, state management, motion primitives, form bindings and more — don't waste time trawling npm for the bare essentials. It's all here.\r
\r
<br/>\r
\r
## Example\r
\r
\`\`\`ts\r
<script>\r
    let count = 1;\r
    $: doubled = count * 2;\r
<\/script>\r
\r
<p>{count} * 2 = {doubled}</p>\r
\r
<button on:click={() => count = count + 1}>Count</button>\r
\r
// comment here\r
\`\`\`\r
\r
### Heading 3\r
\r
#### Heading 4\r
\r
##### Heading 5\r
\r
###### Heading 6\r
\r
> Svelte is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members.\r
`,t=n=>n,p=[t({name:"Programming Languages",slug:"pro-lang"}),t({name:"Frameworks",slug:"framework"}),t({name:"Libraries",slug:"library"}),t({name:"Languages",slug:"lang"}),t({name:"Databases",slug:"db"}),t({name:"ORMs",slug:"orm"}),t({name:"DevOps",slug:"devops"}),t({name:"Testing",slug:"test"}),t({name:"Dev Tools",slug:"devtools"}),t({name:"Markup & Style",slug:"markup-style"}),t({name:"Design",slug:"design"}),t({name:"Soft Skills",slug:"soft"})],r=n=>{const o=u(n,"category");return n.category&&(o.category=p.find(i=>i.slug===n.category)),o},y=(...n)=>l.filter(o=>n.length===0?!0:n.includes(o.slug)),b=n=>{const o=[],i=[];return l.forEach(a=>{if(n.trim()&&!a.name.toLowerCase().includes(n.trim().toLowerCase()))return;if(!a.category){i.push(a);return}let s=o.find(g=>{var c;return g.category.slug===((c=a.category)==null?void 0:c.slug)});s||(s={items:[],category:a.category},o.push(s)),s.items.push(a)}),i.length!==0&&o.push({category:{name:"Others",slug:"others"},items:i}),o},m="Skills",l=[r({slug:"js",color:"yellow",description:"JavaScript ist eine vielseitige Programmiersprache für Webentwicklung.",logo:e.JavaScript,name:"JavaScript",category:"pro-lang"}),r({slug:"ts",color:"blue",description:"TypeScript ist eine typsichere Variante von JavaScript.",logo:e.TypeScript,name:"TypeScript",category:"pro-lang"}),r({slug:"css",color:"blue",description:"CSS ist eine Stylesheet-Sprache zur Gestaltung von Webinhalten.",logo:e.CSS,name:"CSS",category:"markup-style"}),r({slug:"html",color:"orange",description:"HTML ist eine Auszeichnungssprache zur Strukturierung von Webinhalten.",logo:e.HTML,name:"HTML",category:"markup-style"}),r({slug:"reactjs",color:"cyan",description:"React.js ist eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen.",logo:e.ReactJs,name:"React.js",category:"library"}),r({slug:"svelte",color:"orange",description:d,logo:e.Svelte,name:"Svelte",category:"library"}),r({slug:"nodejs",color:"green",description:"Node.js ist eine JavaScript-Laufzeitumgebung, die serverseitige Anwendungen ermöglicht.",logo:e.NodeJs,name:"Node.js",category:"pro-lang"}),r({slug:"flutter",color:"blue",description:"Flutter ist ein Framework zur plattformübergreifenden App-Entwicklung.",logo:e.Flutter,name:"Flutter",category:"framework"}),r({slug:"firebase",color:"orange",description:"Firebase bietet Backend-Dienste wie Authentifizierung und Datenbanken.",logo:e.Firebase,name:"Firebase",category:"db"}),r({slug:"git",color:"orange",description:"Git ist ein Versionskontrollsystem zur Verwaltung von Quellcode.",logo:e.Git,name:"Git",category:"devtools"}),r({slug:"figma",color:"purple",description:"Figma ist ein webbasiertes Design- und Prototyping-Tool.",logo:e.Figma,name:"Figma",category:"design"}),r({slug:"docker",color:"blue",description:"Docker ist eine Plattform zur Erstellung und Verwaltung von Containern.",logo:e.Docker,name:"Docker",category:"devops"}),r({slug:"kubernetes",color:"lightblue",description:"Kubernetes ist eine Open-Source-Plattform zur Verwaltung von Container-Orchestrierungen.",logo:e.Kubernetes,name:"Kubernetes",category:"devops"}),r({slug:"mongo",color:"green",description:"MongoDB ist eine NoSQL-Datenbank, die JSON-ähnliche Dokumente speichert.",logo:e.MongoDB,name:"MongoDB",category:"db"}),r({slug:"python",color:"yellow",description:"Python ist eine einfach zu erlernende Programmiersprache, die sich in vielen Bereichen verwenden lässt.",logo:e.Python,name:"Python",category:"pro-lang"}),r({slug:"java",color:"red",description:"Java ist eine weit verbreitete Programmiersprache für Backend-Entwicklung.",logo:e.Java,name:"Java",category:"pro-lang"}),r({slug:"unity",color:"blue",description:"Unity ist eine Gameengine zur Entwicklung von 2D- und 3D-Spielen.",logo:e.Unity,name:"Unity",category:"3d"}),r({slug:"c#",color:"purple",description:"C# ist eine Programmiersprache von Microsoft für die Entwicklung von Windows-Anwendungen aber auch z.B. relevant für Unity.",logo:e.CSharp,name:"C#",category:"3d"}),r({slug:"threejs",color:"white",description:"ThreeJS ist eine JavaScript-Bibliothek zur Erstellung von 3D-Grafiken im Web.",logo:e.ThreeJS,name:"Three JS",category:"3d"}),r({slug:"webxr",color:"purple",description:"WebXR ist eine API zur Erstellung von Virtual- und Augmented-Reality-Erlebnissen im Web.",logo:e.WebXR,name:"WebXR",category:"library"}),r({slug:"javascript",color:"yellow",description:"JavaScript ist eine vielseitige Programmiersprache für Webentwicklung.",logo:e.JavaScript,name:"JavaScript",category:"pro-lang"}),r({slug:"three.js",color:"white",description:"ThreeJS ist eine JavaScript-Bibliothek zur Erstellung von 3D-Grafiken im Web.",logo:e.ThreeJS,name:"Three JS",category:"3d"})],v={title:m,items:l};export{v as S,y as a,b as g};
