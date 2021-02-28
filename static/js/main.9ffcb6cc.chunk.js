(this["webpackJsonpword-hole"]=this["webpackJsonpword-hole"]||[]).push([[0],{102:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c(17),a=c.n(s),r=(c(51),c(2)),i=c(8),o=c(6),l=c(13),j=c(44),d=c(3),u=c.n(d),b=c(0),m=Object(n.createContext)(),O=function(e){var t=Object(n.useState)(!1),c=Object(r.a)(t,2),s=c[0],a=c[1],i=Object(n.useState)(""),o=Object(r.a)(i,2),l=o[0],d=o[1],O=Object(n.useState)(null),h=Object(r.a)(O,2),x=h[0],f=h[1],p=Object(n.useState)("User"),v=Object(r.a)(p,2),g=v[0],N=v[1],w=Object(n.useState)(window.localStorage.getItem("token")),y=Object(r.a)(w,2),C=y[0],k=y[1],S=function(){a(!1),d(""),f(null),N("User"),k(null),window.localStorage.removeItem("token"),u.a.defaults.headers.common.Authorization=null};return Object(n.useEffect)((function(){if(C){var e=Object(j.a)(C);e.exp>Date.now()/1e3?(u.a.defaults.headers.common.Authorization=C,a(!0),d(e.Username),f(Number(e.UserID)),N(e["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]),window.localStorage.getItem("token")!==C&&window.localStorage.setItem("token",C)):S()}else S()}),[C]),Object(b.jsx)(m.Provider,{value:[{isLoggedIn:s,username:l,userID:x,access:g,token:C},k],children:e.children})},h=m,x=c(30),f=c(15),p=c.n(f),v=function(e){return Object(n.useCallback)((function(e){u.a.isCancel(e)||l.a.error(e&&e.response&&e.response.data&&e.response.data.error?e.response.data.error:"Sorry, an error occurred")}),[])},g=function(e){var t=512,c=v(),s=Object(n.useState)(""),a=Object(r.a)(s,2),i=a[0],o=a[1],l=Object(n.useState)(t),j=Object(r.a)(l,2),d=j[0],m=j[1];return Object(b.jsx)("div",{className:"card",style:{margin:"1rem auto"},children:Object(b.jsxs)("div",{className:"card-content",children:[Object(b.jsx)("textarea",{required:!0,onChange:function(e){var c=e.target.value;c.length>t&&(c=c.substr(0,t)),m(t-c.length),o(c)},className:"textarea",placeholder:"Put your words on Word Hole",value:i}),Object(b.jsx)("button",{onClick:function(){u.a.post("/api/home/post",{Post:i}).then((function(){o(""),m(t),e.refreshPosts()})).catch(c)},className:"button is-primary",style:{marginTop:"0.5rem"},children:"Post"}),Object(b.jsxs)("div",{style:{float:"right",color:"lightgray"},children:["Remaining characters: ",d]})]})})},N=c(19),w=c.n(N),y=c(9),C=c(5),k=c(45),S=function(e){var t=Object(n.useContext)(h),c=Object(r.a)(t,1)[0],s=e.postID,a=e.totalLikes,i=e.isUserLiked,o=e.refresh,j=v(),d=function(){u.a.delete("/api/likes",{data:{PostID:s}}).then((function(){o()})).catch(j)},m=function(){u.a.put("/api/likes",{PostID:s}).then((function(){o()})).catch(j)};return Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"1.5rem"},children:[Object(b.jsx)(y.a,{style:{marginTop:"0.15rem",color:"fuchsia",cursor:"pointer"},icon:i?C.c:k.a,onClick:function(){c.isLoggedIn?i?d():m():l.a.info("Please log in to Like posts")}}),Object(b.jsx)("div",{style:{marginLeft:"0.25rem",fontWeight:600},children:"".concat(a?"(".concat(a,")"):"")})]})},I=(c(86),function(e){var t=512,c=v(),s=Object(n.useContext)(h),a=Object(r.a)(s,1)[0],o=e.postID,l=e.isExpanded,j=e.isProfile,d=e.expandPost,m=e.refreshIndex,O=e.setRefreshIndex,x=Object(n.useState)(null),f=Object(r.a)(x,2),p=f[0],g=f[1],N=Object(n.useState)(null),y=Object(r.a)(N,2),C=y[0],k=y[1],I=Object(n.useState)(null),D=Object(r.a)(I,2),L=D[0],P=D[1],E=Object(n.useState)(null),F=Object(r.a)(E,2),U=F[0],B=F[1],R=Object(n.useState)(!1),q=Object(r.a)(R,2),A=q[0],W=q[1],z=Object(n.useState)(""),T=Object(r.a)(z,2),H=T[0],M=T[1],X=Object(n.useState)(t),J=Object(r.a)(X,2),Y=J[0],$=J[1],G=Object(n.useState)(!1),K=Object(r.a)(G,2),Q=K[0],V=K[1],Z=function(e){A||l||e.target&&e.target.tagName&&"a"!==e.target.tagName.toLowerCase()&&d(o)},_=Object(n.useCallback)((function(e){null!==o&&u.a.get("/api/post",{params:{ID:o}}).then((function(e){g(e.data.post),k(e.data.totalLikes),B(e.data.totalComments),P(e.data.isUserLiked)})).catch(c)}),[o,c]),ee=function(){M(""),W(!1),$(t)};Object(n.useEffect)((function(){p||Q||null===o||_()}),[_,p,Q,o]),Object(n.useEffect)((function(){Q||m!==o||(_(!0),O(null))}),[m,o,_,O,Q]);return Object(b.jsx)(b.Fragment,{children:p?Object(b.jsxs)("div",{className:"card",style:{margin:"1rem auto",overflowX:"auto"},children:[(a.userID===p.userID||"Admin"===a.access)&&Object(b.jsx)("div",{style:{position:"absolute",top:"0.25rem",right:"0.25rem",fontSize:"0.7rem"},children:A?Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(b.jsx)("div",{className:"LinkButton",onClick:ee,children:"Cancel"}),Object(b.jsx)("div",{style:{width:"0.5rem"}}),Object(b.jsx)("div",{className:"LinkButton",onClick:function(){u.a.patch("/api/post",{ID:o,Post:H}).then((function(){ee(),_(),e.onEdit&&e.onEdit()})).catch(c)},style:{fontWeight:700},children:"Save"})]}):Object(b.jsx)("div",{className:"LinkButton",onClick:function(){var e=p&&p.post?p.post:"";M(e),W(!0),$(t-e.length)},children:"Edit"})}),Object(b.jsx)("div",{className:"card-content",style:{cursor:"".concat(l||A?"auto":"pointer")},onClick:Z,children:A?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"LinkButton-Danger",onClick:function(){window.confirm("Are you sure you would like to delete this post?")&&u.a.delete("/api/post",{data:{ID:o}}).then((function(){V(!0),g(null),e.onDelete&&e.onDelete()})).catch(c)},style:{position:"absolute",top:"0.25rem",left:"0.25rem",fontSize:"0.7rem"},children:"Delete"}),Object(b.jsx)("textarea",{onChange:function(e){var c=e.target.value;c.length>t&&(c=c.substr(0,t)),$(t-c.length),M(c)},value:H,className:"textarea"}),Object(b.jsxs)("div",{style:{float:"right",color:"lightgray"},children:["Remaining characters: ",Y]})]}):Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{style:{whiteSpace:"pre-wrap"},children:Object(b.jsx)(w.a,{children:p.post})})})}),Object(b.jsxs)("div",{className:"card-footer",style:{justifyContent:"space-between",fontSize:"0.7rem",color:"gray",padding:"1rem"},children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{children:"".concat(p.date).concat(p.isEdited?" (Edited)":"")}),j?Object(b.jsx)("div",{children:"".concat(p.username)}):Object(b.jsx)("div",{className:"LinkButton",children:Object(b.jsx)(i.b,{to:"/p/".concat(p.username),children:"".concat(p.username)})})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)(S,{postID:o,totalLikes:C,isUserLiked:L,refresh:_}),!l&&Object(b.jsx)("div",{className:"LinkButton",style:{width:"5.5rem"},onClick:Z,children:"Comments".concat(U&&U>0?" (".concat(U,")"):"")})]})]})]}):Object(b.jsx)(b.Fragment,{children:Q?null:Object(b.jsx)("div",{className:"card",style:{margin:"1rem auto"},children:Object(b.jsx)("div",{className:"card-content",children:Object(b.jsx)("progress",{className:"progress is-small is-light",max:"100"})})})})})}),D=c(29),L=c.n(D),P=function(e){var t=e.postID,c=e.refreshComments,s=v(),a=Object(n.useState)(""),i=Object(r.a)(a,2),o=i[0],l=i[1];return Object(b.jsx)("div",{className:"card",style:{margin:"1rem auto"},children:Object(b.jsxs)("div",{className:"card-content",children:[Object(b.jsx)("textarea",{required:!0,className:"textarea",value:o,onChange:function(e){return l(e.target.value)},placeholder:"Comment on this post"}),Object(b.jsx)("button",{onClick:function(){o&&t&&u.a.post("/api/comments",{Comment:String(o),PostID:Number(t)}).then((function(){l(""),c()})).catch(s)},className:"button is-primary",style:{marginTop:"0.5rem"},children:"Comment"})]})})},E=function(e){var t=e.commentID,c=e.refreshComments,s=Object(n.useContext)(h),a=Object(r.a)(s,1)[0],o=v(),l=Object(n.useState)(null),j=Object(r.a)(l,2),d=j[0],m=j[1],O=Object(n.useState)(!1),x=Object(r.a)(O,2),f=x[0],p=x[1],g=Object(n.useState)(""),N=Object(r.a)(g,2),y=N[0],C=N[1],k=Object(n.useCallback)((function(){u.a.get("/api/comments",{params:{CommentID:t}}).then((function(e){m(e.data)})).catch(o)}),[t,o]),S=function(){p(!1),C("")};return Object(n.useEffect)((function(){d||k()}),[d,k]),Object(b.jsx)(b.Fragment,{children:d?Object(b.jsxs)("div",{className:"card",style:{margin:"1rem auto",overflowX:"auto"},children:[(a.userID===d.userID||"Admin"===a.access)&&Object(b.jsx)("div",{style:{position:"absolute",top:"0.25rem",right:"0.25rem",fontSize:"0.7rem"},children:f?Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(b.jsx)("div",{className:"LinkButton",onClick:S,children:"Cancel"}),Object(b.jsx)("div",{style:{width:"0.5rem"}}),Object(b.jsx)("div",{className:"LinkButton",onClick:function(){u.a.patch("/api/comments",{CommentID:t,Comment:y}).then((function(){k(),S()})).catch(o)},style:{fontWeight:700},children:"Save"})]}):Object(b.jsx)("div",{className:"LinkButton",onClick:function(){var e,t=d&&(null!==(e=d.comment)&&void 0!==e?e:"");C(t),p(!0)},children:"Edit"})}),Object(b.jsx)("div",{className:"card-content",children:Object(b.jsx)("div",{style:{whiteSpace:"pre-wrap"},children:f?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"LinkButton-Danger",onClick:function(){window.confirm("Are you sure you would like to delete this comment?")&&u.a.delete("/api/comments",{data:{CommentID:t}}).then((function(){c()})).catch(o)},style:{position:"absolute",top:"0.25rem",left:"0.25rem",fontSize:"0.7rem"},children:"Delete"}),Object(b.jsx)("textarea",{onChange:function(e){return C(e.target.value)},value:y,className:"textarea"})]}):Object(b.jsx)(w.a,{children:"".concat(d.comment)})})}),Object(b.jsx)("div",{className:"card-footer",style:{justifyContent:"space-between",fontSize:"0.7rem",color:"gray",padding:"1rem"},children:Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{children:"".concat(d.date).concat(d.isEdited?" (Edited)":"")}),Object(b.jsx)("div",{className:"LinkButton",children:Object(b.jsx)(i.b,{to:"/p/".concat(d.username),children:"".concat(d.username)})})]})})]}):Object(b.jsx)("div",{className:"card",style:{margin:"1rem auto"},children:Object(b.jsx)("div",{className:"card-content",children:Object(b.jsx)("progress",{className:"progress is-small is-light",max:"100"})})})})},F=function(e){var t=e.postID,c=e.onPostDelete,s=Object(n.useContext)(h),a=Object(r.a)(s,1)[0],i=v(),o=Object(n.useState)(null),l=Object(r.a)(o,2),j=l[0],d=l[1],m=Object(n.useCallback)((function(){null!==t&&u.a.get("/api/comments/list",{params:{PostID:t}}).then((function(e){d(e.data)})).catch(i)}),[t,i]);return Object(n.useEffect)((function(){j||m()}),[j,m]),Object(b.jsxs)("div",{style:{overflowX:"hidden"},children:[Object(b.jsx)(I,{postID:t,isExpanded:!0,onDelete:c}),a.isLoggedIn&&Object(b.jsx)(P,{postID:t,refreshComments:m}),j&&j.length>0&&Object(b.jsx)("div",{style:{width:"40rem",margin:"1rem auto",fontWeight:600,color:"gray",paddingLeft:"2rem"},children:"Comments"}),j&&j.map((function(e){return Object(b.jsx)(E,{commentID:e,refreshComments:m},e)}))]})};L.a.setAppElement("#root");var U=function(e){var t=e.isOpen,c=e.closeModal,n=e.postID;return Object(b.jsx)(L.a,{isOpen:t,onRequestClose:c,style:{content:{padding:"1rem 0 1rem 0",maxWidth:"60rem",margin:"auto",top:"0.5rem",bottom:"0.5rem",left:"1.75rem",right:"1.75rem"},overlay:{zIndex:35,backgroundColor:"rgba(128, 128, 128, 0.7)"}},children:Object(b.jsx)("div",{className:"container",children:Object(b.jsx)(F,{postID:n,onPostDelete:function(){c()}})})})},B=function(e){var t=Object(n.useContext)(h),c=Object(r.a)(t,1)[0],s=v(),a=Object(n.useState)(null),i=Object(r.a)(a,2),o=i[0],l=i[1],j=Object(n.useState)(!1),d=Object(r.a)(j,2),m=d[0],O=d[1],f=Object(n.useState)(null),N=Object(r.a)(f,2),w=N[0],y=N[1],C=Object(n.useState)(null),k=Object(r.a)(C,2),S=k[0],D=k[1],L=Object(n.useRef)(),P=Object(n.useRef)(!1);L.current=function(){return o};var E=Object(n.useCallback)((function(){u.a.get("/api/home/posts",{params:{LastID:null}}).then((function(e){return l(e.data)})).catch(s)}),[s]),F=Object(n.useCallback)((function(){var e=L.current();if(e&&!(e.length<1)){var t=e[e.length-1];t<=1||(P.current=!0,u.a.get("/api/home/posts",{params:{lastID:t}}).then((function(e){return l([].concat(Object(x.a)(o),Object(x.a)(e.data)))})).catch(s).finally((function(){return P.current=!1})))}}),[o,s]),B=function(e){y(e),O(!0),window.history.pushState(null,null,"/wh/".concat(e))},R=Object(n.useCallback)((function(e){!P.current&&window.innerHeight+document.documentElement.scrollTop+200>=document.documentElement.offsetHeight&&F()}),[F]);return Object(n.useEffect)((function(){o||E()}),[o,E]),Object(n.useEffect)((function(){return window.addEventListener("scroll",R),function(){return window.removeEventListener("scroll",R)}}),[R]),Object(n.useEffect)((function(){o&&o.length>0&&window.innerHeight>document.documentElement.offsetHeight&&R()}),[o,R]),Object(n.useEffect)((function(){return m?p.a.on():p.a.off(),function(){return p.a.off()}}),[m]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"container",children:[c.isLoggedIn&&Object(b.jsx)(g,{refreshPosts:E}),o&&o.map((function(e){return Object(b.jsx)(I,{postID:e,expandPost:B,refreshIndex:S,setRefreshIndex:D},e)}))]}),Object(b.jsx)(U,{isOpen:m,closeModal:function(){O(!1),D(w),y(null),window.history.pushState(null,null,"/")},postID:w})]})},R=function(e){var t=Object(o.g)(),c=Object(o.h)().postID;return Object(b.jsx)("div",{className:"container",children:Object(b.jsx)(F,{postID:c,onPostDelete:function(){t.push("/")}})})},q=function(e){var t=v(),c=Object(o.h)().username,s=Object(n.useState)(null),a=Object(r.a)(s,2),i=a[0],l=a[1],j=Object(n.useState)(null),d=Object(r.a)(j,2),m=d[0],O=d[1],h=Object(n.useState)(!1),x=Object(r.a)(h,2),f=x[0],g=x[1],N=Object(n.useState)(null),w=Object(r.a)(N,2),y=w[0],C=w[1],k=Object(n.useState)(null),S=Object(r.a)(k,2),D=S[0],L=S[1],P=Object(n.useCallback)((function(){u.a.get("/api/profile/posts",{params:{UserID:i.userID}}).then((function(e){return O(e.data)})).catch(t)}),[i,t]),E=function(e){C(e),g(!0),window.history.pushState(null,null,"/wh/".concat(e))};return Object(n.useEffect)((function(){u.a.get("/api/profile/user",{params:{Username:c}}).then((function(e){return l(e.data)})).catch(t)}),[c,t]),Object(n.useEffect)((function(){i&&P()}),[i,P]),Object(n.useEffect)((function(){return f?p.a.on():p.a.off(),function(){return p.a.off()}}),[f]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"container",children:[i&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h5",{style:{textAlign:"center"},className:"title",children:"".concat(i.username,"'s Posts")}),Object(b.jsx)(b.Fragment,{children:"User"!==i.access&&Object(b.jsx)("h5",{style:{textAlign:"center"},className:"subtitle",children:i.access})})]}),m&&m.map((function(e){return Object(b.jsx)(I,{postID:e,expandPost:E,refreshIndex:D,setRefreshIndex:L,isProfile:!0},e)}))]}),Object(b.jsx)(U,{isOpen:f,closeModal:function(){g(!1),L(y),C(null),window.history.pushState(null,null,"/p/".concat(c))},postID:y,refresh:P})]})},A=function(e){var t=v(),c=Object(n.useContext)(h),s=Object(r.a)(c,1)[0],a=Object(n.useState)(""),i=Object(r.a)(a,2),o=i[0],j=i[1],d=Object(n.useState)(""),m=Object(r.a)(d,2),O=m[0],x=m[1],f=Object(n.useState)(""),p=Object(r.a)(f,2),g=p[0],N=p[1],w=Object(n.useState)(!1),k=Object(r.a)(w,2),S=k[0],I=k[1],D=Object(n.useState)(!1),L=Object(r.a)(D,2),P=L[0],E=L[1],F=Object(n.useState)(!1),U=Object(r.a)(F,2),B=U[0],R=U[1];return Object(b.jsx)(b.Fragment,{children:s.isLoggedIn?Object(b.jsx)("div",{className:"container",children:Object(b.jsxs)("div",{className:"card",children:[Object(b.jsx)("div",{className:"card-title",children:Object(b.jsx)("h1",{children:"Update Password"})}),Object(b.jsx)("div",{className:"card-body",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),u.a.patch("/api/settings/password",{Current:o,New:O,Confirm:g}).then((function(){l.a.info("Password updated"),j(""),x(""),N("")})).catch(t)},children:[Object(b.jsx)("label",{htmlFor:"current-password",className:"label",children:"Current Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{value:o,onChange:function(e){return j(e.target.value)},className:"input",name:"current-password",type:S?"input":"password",placeholder:"Current Password",required:!0})}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return I(!S)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:S?C.a:C.b})})})]}),Object(b.jsx)("label",{htmlFor:"new-password",className:"label",children:"New Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{value:O,onChange:function(e){return x(e.target.value)},className:"input",name:"new-password",type:P?"input":"password",placeholder:"New Password",required:!0})}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return E(!P)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:P?C.a:C.b})})})]}),Object(b.jsx)("label",{htmlFor:"confirm-password",className:"label",children:"Confirm Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{value:g,onChange:function(e){return N(e.target.value)},className:"input",name:"confirm-password",type:B?"input":"password",placeholder:"Confirm Password",required:!0})}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return R(!B)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:B?C.a:C.b})})})]}),Object(b.jsx)("div",{className:"field",children:Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Update"})})})]})})]})}):Object(b.jsx)("div",{className:"container",children:"Please log in or create an account to view this page."})})},W=(c(98),function(e){var t=v(),c=Object(n.useContext)(h),s=Object(r.a)(c,2),a=s[0],i=s[1],l=Object(n.useState)(!1),j=Object(r.a)(l,2),d=j[0],m=j[1],O=Object(n.useState)(!1),x=Object(r.a)(O,2),f=x[0],p=x[1],g=Object(n.useState)(""),N=Object(r.a)(g,2),w=N[0],k=N[1],S=Object(n.useState)(""),I=Object(r.a)(S,2),D=I[0],L=I[1],P=Object(n.useState)(""),E=Object(r.a)(P,2),F=E[0],U=E[1];return a.isLoggedIn?Object(b.jsx)(o.a,{to:"/"}):Object(b.jsx)("div",{className:"container",children:Object(b.jsxs)("div",{className:"card",children:[Object(b.jsx)("div",{className:"card-title",children:Object(b.jsx)("h1",{children:"Registration"})}),Object(b.jsx)("div",{className:"card-body",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),u.a.post("/api/register",{username:w,password:D,Confirm:F}).then((function(e){i(e.data.jwt)})).catch(t)},children:[Object(b.jsx)("label",{htmlFor:"username",className:"label",children:"Username"}),Object(b.jsx)("div",{className:"field",children:Object(b.jsxs)("p",{className:"control has-icons-left",children:[Object(b.jsx)("input",{value:w,onChange:function(e){return k(e.target.value)},className:"input",type:"text",name:"username",placeholder:"Username",autoFocus:!0,required:!0}),Object(b.jsx)("span",{className:"icon is-small is-left",children:Object(b.jsx)(y.a,{icon:C.e})})]})}),Object(b.jsx)("label",{htmlFor:"password",className:"label",children:"Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsxs)("p",{className:"control is-expanded has-icons-left",children:[Object(b.jsx)("input",{value:D,onChange:function(e){return L(e.target.value)},className:"input",name:"password",type:d?"input":"password",placeholder:"Password",required:!0}),Object(b.jsx)("span",{className:"icon is-small is-left",children:Object(b.jsx)(y.a,{icon:C.d})})]}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return m(!d)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:d?C.a:C.b})})})]}),Object(b.jsx)("label",{htmlFor:"confirm-password",className:"label",children:"Confirm Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsxs)("p",{className:"control is-expanded has-icons-left",children:[Object(b.jsx)("input",{value:F,onChange:function(e){return U(e.target.value)},className:"input",name:"confirm-password",type:f?"input":"password",placeholder:"Confirm Password",required:!0}),Object(b.jsx)("span",{className:"icon is-small is-left",children:Object(b.jsx)(y.a,{icon:C.d})})]}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return p(!f)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:f?C.a:C.b})})})]}),Object(b.jsx)("div",{className:"field",children:Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Register"})})})]})})]})})}),z=function(e){var t=Object(n.useContext)(h),c=Object(r.a)(t,2),s=c[0],a=c[1],i=v(),l=Object(n.useState)(!1),j=Object(r.a)(l,2),d=j[0],m=j[1],O=Object(n.useState)(""),x=Object(r.a)(O,2),f=x[0],p=x[1],g=Object(n.useState)(""),N=Object(r.a)(g,2),w=N[0],k=N[1];return s.isLoggedIn?Object(b.jsx)(o.a,{to:"/"}):Object(b.jsx)("div",{className:"container",children:Object(b.jsxs)("div",{className:"card",children:[Object(b.jsx)("div",{className:"card-title",children:Object(b.jsx)("h1",{children:"Login"})}),Object(b.jsx)("div",{className:"card-body",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),u.a.post("/api/login",{username:f,password:w}).then((function(e){a(e.data.jwt)})).catch(i)},children:[Object(b.jsx)("label",{htmlFor:"username",className:"label",children:"Username"}),Object(b.jsx)("div",{className:"field",children:Object(b.jsxs)("p",{className:"control has-icons-left",children:[Object(b.jsx)("input",{value:f,onChange:function(e){return p(e.target.value)},className:"input",type:"text",name:"username",placeholder:"Username",autoFocus:!0,required:!0}),Object(b.jsx)("span",{className:"icon is-small is-left",children:Object(b.jsx)(y.a,{icon:C.e})})]})}),Object(b.jsx)("label",{htmlFor:"password",className:"label",children:"Password"}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsxs)("p",{className:"control is-expanded has-icons-left",children:[Object(b.jsx)("input",{value:w,onChange:function(e){return k(e.target.value)},className:"input",name:"password",type:d?"input":"password",placeholder:"Password",required:!0}),Object(b.jsx)("span",{className:"icon is-small is-left",children:Object(b.jsx)(y.a,{icon:C.d})})]}),Object(b.jsx)("div",{className:"control",children:Object(b.jsx)("div",{onClick:function(){return m(!d)},className:"button",style:{width:"3rem"},children:Object(b.jsx)(y.a,{icon:d?C.a:C.b})})})]}),Object(b.jsx)("div",{className:"field",children:Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Log In"})})})]})})]})})},T=function(e){var t=Object(n.useContext)(h),c=Object(r.a)(t,2),s=c[0],a=c[1];return Object(n.useEffect)((function(){s.token&&(a(null),l.a.info("You have been logged out"))}),[s.token,a]),Object(b.jsx)(b.Fragment,{children:s.token?Object(b.jsx)(o.a,{to:"/"}):Object(b.jsx)("div",{children:"Logging out..."})})},H=function(e){return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("h1",{className:"title",children:"404"}),Object(b.jsx)("p",{className:"subtitle",children:"Nothing was found at this location"})]})},M=(c(99),function(){var e=Object(n.useContext)(h),t=Object(r.a)(e,1)[0],c=Object(n.useState)(!1),s=Object(r.a)(c,2),a=s[0],o=s[1],l=Object(n.useState)(!1),j=Object(r.a)(l,2),d=j[0],u=j[1],m=Object(n.useCallback)((function(e){d&&u(!1)}),[d]);return Object(n.useEffect)((function(){return window.addEventListener("click",m),function(){return window.removeEventListener("click",m)}}),[m]),Object(b.jsxs)("nav",{style:{marginBottom:"1rem"},className:"navbar is-dark",role:"navigation","aria-label":"main navigation",children:[Object(b.jsxs)("div",{className:"navbar-brand",children:[Object(b.jsx)(i.b,{className:"navbar-item NavBar-brand",to:"/",children:"Word Hole"}),Object(b.jsxs)("div",{onClick:function(){return o(!a)},role:"button",className:"".concat(a?"is-active":""," navbar-burger"),"aria-label":"menu","aria-expanded":"false",children:[Object(b.jsx)("span",{"aria-hidden":"true"}),Object(b.jsx)("span",{"aria-hidden":"true"}),Object(b.jsx)("span",{"aria-hidden":"true"})]})]}),Object(b.jsx)("div",{className:"".concat(a?"is-active":""," navbar-menu"),children:Object(b.jsx)("div",{className:"navbar-end",children:t.isLoggedIn?Object(b.jsxs)("div",{id:"navbar-username-dropdown-button",className:"navbar-item has-dropdown ".concat(d?"is-active":""),children:[Object(b.jsx)("div",{className:"navbar-link",onClick:function(){return u(!d)},children:t.username}),Object(b.jsxs)("div",{className:"navbar-dropdown",children:[Object(b.jsx)(i.b,{className:"navbar-item",to:"/p/".concat(t.username),children:"Profile"}),Object(b.jsx)(i.b,{className:"navbar-item",to:"/settings",children:"Settings"}),Object(b.jsx)("hr",{className:"navbar-divider"}),Object(b.jsx)(i.b,{className:"navbar-item",to:"/logout",children:"Log Out"})]})]}):Object(b.jsx)("div",{className:"navbar-item",children:Object(b.jsxs)("div",{className:"buttons",children:[Object(b.jsx)(i.b,{className:"button is-dark",to:"/register",children:"Register"}),Object(b.jsx)(i.b,{className:"button is-primary",to:"/login",children:Object(b.jsx)("strong",{children:"Log In"})})]})})})})]})}),X=function(e){var t=Object(n.useState)(!1),c=Object(r.a)(t,2),s=c[0],a=c[1],i=e.setIsServerAwake;Object(n.useEffect)((function(){s||setTimeout((function(){return a(!0)}),700)}),[s]);var o=Object(n.useCallback)((function(){u.a.get("/api/common/hello").then((function(){return i(!0)})).catch((function(){return setTimeout(o,500)}))}),[i]);return Object(n.useEffect)((function(){return o()}),[o]),Object(b.jsx)(b.Fragment,{children:s?Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("h2",{className:"subtitle",style:{marginTop:"2rem"},children:"Waking up the server..."}),Object(b.jsx)("progress",{className:"progress is-small is-primary",max:"100"})]}):Object(b.jsx)(b.Fragment,{})})};l.a.configure({hideProgressBar:!0,newestOnTop:!0,autoClose:3e3});var J=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),c=t[0],s=t[1];return Object(b.jsx)(b.Fragment,{children:c?Object(b.jsx)(i.a,{children:Object(b.jsxs)(O,{children:[Object(b.jsx)(M,{}),Object(b.jsxs)(o.d,{children:[Object(b.jsx)(o.b,{path:"/",exact:!0,component:B}),Object(b.jsx)(o.b,{path:"/wh/:postID",exact:!0,component:R}),Object(b.jsx)(o.b,{path:"/p/:username",exact:!0,component:q}),Object(b.jsx)(o.b,{path:"/settings",exact:!0,component:A}),Object(b.jsx)(o.b,{path:"/register",exact:!0,component:W}),Object(b.jsx)(o.b,{path:"/login",exact:!0,component:z}),Object(b.jsx)(o.b,{path:"/logout",exact:!0,component:T}),Object(b.jsx)(o.b,{component:H})]})]})}):Object(b.jsx)(X,{setIsServerAwake:s})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c(100),c(101);u.a.defaults.baseURL="https://word-hole.herokuapp.com",a.a.render(Object(b.jsx)(J,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},51:function(e,t,c){},86:function(e,t,c){},98:function(e,t,c){},99:function(e,t,c){}},[[102,1,2]]]);
//# sourceMappingURL=main.9ffcb6cc.chunk.js.map