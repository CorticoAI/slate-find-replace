(this["webpackJsonpslate-find-replace"]=this["webpackJsonpslate-find-replace"]||[]).push([[0],{40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(12),i=a(7),s=a(1),r=a(0),o=a(2),c=a.n(o),h=a(22),l=a(15),u=a(9),f=function(e,t,a,n){var i=[],s=a.q,o=a.caseSensitive;if(!r.g.isText(e)||s.length<=0)return i;var c=e.text,h=s;o||(c=c.toLowerCase(),h=s.toLowerCase());var l=c.split(h),u=0;return l.forEach((function(e,a){if(0!==a){var s=n&&r.e.equals(n.anchor.path,t)&&n.focus.offset===u;i.push({anchor:{path:t,offset:u-h.length},focus:{path:t,offset:u},isSearchHighlight:!0,isFocusedSearchHighlight:!!s})}u=u+e.length+h.length})),i},d=function(e,t){if(!e.children.length||t.q.length<=0)return[];for(var a=r.a.nodes(e,{at:[],match:function(e){return r.g.isText(e)&&e.text.includes(t.q)}}),n=a.next(),i=[];!n.done;){var o=Object(s.a)(n.value,2),c=o[0],h=o[1];i.push.apply(i,Object(u.a)(f(c,h,t))),n=a.next()}return i},b=a(4),m=function(e){var t=e.searchParams,a=e.setSearchParams,n=e.onSearchNext,r=e.onSearchPrevious,o=e.onReplace,h=e.totalSearchResults,l=e.searchIndex,u=c.a.useState(""),f=Object(s.a)(u,2),d=f[0],m=f[1];return Object(b.jsxs)("div",{style:{border:"1px solid cornflowerblue",padding:"8px"},children:[Object(b.jsxs)("div",{style:{marginBottom:"8px"},children:[Object(b.jsx)("input",{value:t.q,onChange:function(e){a(Object(i.a)(Object(i.a)({},t),{},{q:e.currentTarget.value}))},style:{marginRight:"4px"}}),Object(b.jsx)("button",{onClick:r,style:{marginRight:"4px"},children:"Previous"}),Object(b.jsx)("button",{onClick:n,style:{marginRight:"4px"},children:"Next"}),t.q.length>0&&Object(b.jsxs)("span",{style:{marginRight:"4px"},children:[0===h?0:l+1," of"," ",h]})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{value:d,onChange:function(e){m(e.currentTarget.value)},style:{marginRight:"4px"}}),Object(b.jsx)("button",{style:{marginRight:"4px"},onClick:function(){o({text:d,all:!1})},children:"Replace"}),Object(b.jsx)("button",{onClick:function(){o({text:d,all:!0})},children:"Replace all"})]}),Object(b.jsx)("div",{children:Object(b.jsxs)("label",{children:[Object(b.jsx)("input",{type:"checkbox",checked:t.caseSensitive,onChange:function(){a(Object(i.a)(Object(i.a)({},t),{},{caseSensitive:!t.caseSensitive}))}}),"Case sensitive"]})})]})},p=[{type:"paragraph",children:[{text:"In my younger and more vulnerable years my father gave me some advice that I\u2019ve been turning over in my mind ever since."}]},{type:"paragraph",children:[{text:"\u201cWhenever you feel like criticizing anyone,\u201d he told me, \u201cjust remember that all the people in this world haven\u2019t had the advantages that you\u2019ve had.\u201d"}]},{type:"paragraph",children:[{text:"He didn\u2019t say any more, but we\u2019ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I\u2019m inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought\u2014frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgements is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth."}]},{type:"paragraph",children:[{text:"And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don\u2019t care what it\u2019s founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction\u2014Gatsby, who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the \u201ccreative temperament\u201d\u2014it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No\u2014Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men."}]}],g=function(){var e=c.a.useMemo((function(){return Object(h.a)(Object(l.c)(Object(r.i)()))}),[]),t=c.a.useState(p),a=Object(s.a)(t,2),n=a[0],o=a[1],u=c.a.useState({q:"",caseSensitive:!1}),g=Object(s.a)(u,2),v=g[0],j=g[1],y=c.a.useState([]),x=Object(s.a)(y,2),O=x[0],w=x[1],I=c.a.useState(0),S=Object(s.a)(I,2),k=S[0],q=S[1];c.a.useRef(null);c.a.useEffect((function(){var t=d(e,v);w(t);var a=function(e,t){var a=0;if(e.selection){var n=e.selection.anchor;t.some((function(e){var t=r.e.compare(e.anchor.path,n.path);if(-1===t)++a;else{if(0!==t)return!0;if(!(e.anchor.offset<=n.offset))return!0;++a}return!1}))||(a=0)}return a}(e,t);q(a)}),[v,e]);var C=c.a.useCallback((function(e){return Object(b.jsx)("p",Object(i.a)({},e))}),[]),R=O[k],T=c.a.useCallback((function(e){var t=e.attributes,a=e.children,n=e.leaf,s="transparent";return n.isFocusedSearchHighlight?s="peachpuff":n.isSearchHighlight&&(s="gainsboro"),Object(b.jsx)("span",Object(i.a)(Object(i.a)(Object(i.a)({},t),n.isFocusedSearchHighlight&&{"data-testid":"search-focused"}),{},{style:{backgroundColor:s},children:a}))}),[]),P=c.a.useCallback((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1];return f(a,n,v,R)}),[R,v]);return Object(b.jsxs)("div",{children:[Object(b.jsx)(m,{searchParams:v,setSearchParams:j,onSearchNext:function(){k>=O.length-1?q(0):q(k+1)},onSearchPrevious:function(){q(0===k?O.length-1:k-1)},onReplace:function(t){t.all?function(e,t,a){if(a.length){var n,s=Math.abs(a[0].anchor.offset-a[0].focus.offset),o=0;a.forEach((function(a){var c=a.anchor.path;n&&r.e.equals(c,n)?o+=t.length-s:o=0,r.h.insertText(e,t,{at:{anchor:Object(i.a)(Object(i.a)({},a.anchor),{},{offset:a.anchor.offset+o}),focus:Object(i.a)(Object(i.a)({},a.focus),{},{offset:a.focus.offset+o})}}),n=a.anchor.path}))}}(e,t.text,O):function(e,t,a){r.h.insertText(e,t,{at:{anchor:a.anchor,focus:a.focus}})}(e,t.text,R)},searchIndex:k,totalSearchResults:O.length}),n.length>0&&Object(b.jsx)(l.b,{editor:e,value:n,onChange:function(t){var a=e.operations[0];if(a&&("insert_text"===a.type||"remove_text"===a.type)){var n=d(e,v);w(n)}o(t)},children:Object(b.jsx)(l.a,{renderElement:C,renderLeaf:T,decorate:P})})]})};a(40);function v(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("div",{className:"content",children:[Object(b.jsx)("h1",{children:"Slate find & replace!"}),Object(b.jsx)("p",{children:"ft. The Great Gatsby"}),Object(b.jsx)(g,{})]})})}var j=document.getElementById("root");Object(n.render)(Object(b.jsx)(v,{}),j)}},[[41,1,2]]]);
//# sourceMappingURL=main.1430e2ed.chunk.js.map