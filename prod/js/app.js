var ownApi={get:function(e,n){var t=new XMLHttpRequest;if(t.open("GET",e),n)for(var r in n)t.setRequestHeader(r,n[r]);return t.send(null),{done:function(e){t.addEventListener("load",function(n){var t=JSON.parse(n.srcElement.response);e(t)})}}},post:function(e,n,t){var r=new XMLHttpRequest;if(r.open("POST",e),t)for(var o in t)r.setRequestHeader(o,t[o]);return r.send(JSON.stringify(n)),{done:function(e){r.addEventListener("load",function(n){var t=JSON.parse(n.srcElement.response);e(t)})}}},head:function(n,t){var r=new XMLHttpRequest;if(r.open("HEAD",n),t)for(var o in t)r.setRequestHeader(o,t[o]);return r.send(null),{done:function(){r.addEventListener("load",function(n){n(JSON.parse(e.srcElement.response))})}}},put:function(n,t){var r=new XMLHttpRequest;if(r.open("PUT",n),t)for(var o in t)r.setRequestHeader(o,t[o]);return r.send(null),{done:function(){r.addEventListener("load",function(n){n(JSON.parse(e.srcElement.response))})}}}};function createRepo(e){var n=document.createElement("div"),t=document.createElement("p");t.innerText=e.id;var r=document.createElement("p");r.innerText=e.name;var o=document.createElement("p");o.innerText=e.owner.login,n.classList.add("item"),document.body.appendChild(n),n.appendChild(t),n.appendChild(r),n.appendChild(o)}ownApi.get("https://api.github.com/users/itspoma/repos",{"Accept-Language":"ua"}).done(function(e){var n=e;for(var t in n)createRepo(n[t]),console.log(n[t])});