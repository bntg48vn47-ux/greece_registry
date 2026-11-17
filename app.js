/* Greece Registry front end. Static site + Supabase (auth, Postgres, storage). */
const {SUPABASE_URL,SUPABASE_ANON_KEY,REQUIRE_LOGIN,PHOTO_LIMIT}=window.CONFIG;
const db=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const IG="https://www.instagram.com/gr_registry";
var T={en:{home:"Home",archive:"Archive",contact:"Contact",legal:"Legal",
h:"Documenting Greece’s most exclusive cars",sub:"A visual archive of rare, limited-edition and exotic cars seen on Greek roads. Cars only, no owner details.",
browse:"Browse the archive",add:"Add a car",cars:"cars",makes:"makes",models:"models",allb:"All brands",ally:"All years",plate:"Plate letters",brand:"Brand",model:"Model",year:"Year",color:"Exterior colour",interior:"Interior",drive:"Drive",notes:"Notes",
none:"No cars here yet. Add the first one.",back:"Archive",cancel:"Cancel",submit:"Add car",
spec:["Brand","Model","Year","Exterior","Interior","Drive","Notes"],maskn:"Plates are partly hidden to protect owners’ privacy.",
copy:"© 2026 Greece Registry",own:"Owned and run by",photos:"Photos (up to 10)",addph:"Add photos",limit:"Maximum 10 photos per car. Extra photos were skipped.",
plhint:"Enter only the first 3 letters of the plate. The numbers are never saved.",signin:"Adding cars is only available to signed-in members of this site.",saving:"Saving…",err:"Something went wrong. Check your connection and try again.",remove:"Remove",rmcar:"Remove this car",
cth:"Contact",ctp:"Spotted something rare on Greek roads? Send photos and details on Instagram.",
rm:"Removal request",rmp:"Vehicle registration plates can be personal data under the GDPR. If your car appears here and you want it removed, message us with the make, model and plate. We will confirm within 7 days and remove it within 30.",
lg:"Legal",lgp:"Placeholder text. Before launch, have a Greek lawyer write the privacy policy, terms and cookie policy, and reference the Hellenic Data Protection Authority (dpa.gr)."},
el:{home:"Αρχική",archive:"Αρχείο",contact:"Επικοινωνία",legal:"Νομικά",
h:"Καταγράφουμε τα πιο ξεχωριστά αυτοκίνητα της Ελλάδας",sub:"Ένα οπτικό αρχείο με σπάνια, περιορισμένης παραγωγής και εξωτικά αυτοκίνητα στους ελληνικούς δρόμους. Μόνο αυτοκίνητα, χωρίς στοιχεία ιδιοκτητών.",
browse:"Δείτε το αρχείο",add:"Προσθήκη αυτοκινήτου",cars:"αυτοκίνητα",makes:"μάρκες",models:"μοντέλα",allb:"Όλες οι μάρκες",ally:"Όλα τα έτη",plate:"Γράμματα πινακίδας",brand:"Μάρκα",model:"Μοντέλο",year:"Έτος",color:"Χρώμα εξωτερικού",interior:"Εσωτερικό",drive:"Τιμόνι",notes:"Σημειώσεις",
none:"Δεν υπάρχουν ακόμη αυτοκίνητα. Προσθέστε το πρώτο.",back:"Αρχείο",cancel:"Ακύρωση",submit:"Προσθήκη",
spec:["Μάρκα","Μοντέλο","Έτος","Εξωτερικό","Εσωτερικό","Τιμόνι","Σημειώσεις"],maskn:"Οι πινακίδες καλύπτονται εν μέρει για την προστασία των ιδιοκτητών.",
copy:"© 2026 Greece Registry",own:"Ιδιοκτησία και διαχείριση από",photos:"Φωτογραφίες (έως 10)",addph:"Προσθήκη φωτογραφιών",limit:"Έως 10 φωτογραφίες ανά αυτοκίνητο. Οι υπόλοιπες παραλείφθηκαν.",
plhint:"Γράψτε μόνο τα 3 πρώτα γράμματα της πινακίδας. Οι αριθμοί δεν αποθηκεύονται ποτέ.",signin:"Η προσθήκη αυτοκινήτων είναι διαθέσιμη μόνο σε συνδεδεμένα μέλη αυτού του site.",saving:"Αποθήκευση…",err:"Κάτι πήγε στραβά. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.",remove:"Αφαίρεση",rmcar:"Αφαίρεση αυτοκινήτου",
cth:"Επικοινωνία",ctp:"Είδατε κάτι σπάνιο στους ελληνικούς δρόμους; Στείλτε φωτογραφίες και στοιχεία στο Instagram.",
rm:"Αίτημα αφαίρεσης",rmp:"Οι πινακίδες κυκλοφορίας μπορεί να είναι προσωπικά δεδομένα βάσει GDPR. Αν το αυτοκίνητό σας εμφανίζεται εδώ και θέλετε να αφαιρεθεί, στείλτε μας μάρκα, μοντέλο και πινακίδα. Θα απαντήσουμε σε 7 ημέρες και θα το αφαιρέσουμε σε 30.",
lg:"Νομικά",lgp:"Κείμενο υποκατάστασης. Πριν την κυκλοφορία, ζητήστε από Έλληνα δικηγόρο την πολιτική απορρήτου, τους όρους και την πολιτική cookies, με αναφορά στην Αρχή Προστασίας Δεδομένων (dpa.gr)."}};
Object.assign(T.en,{login:"Log in",signup:"Create account",logout:"Log out",email:"Email",password:"Password (8+ characters)",username:"Username (letters, numbers, _)",country:"Country",selcountry:"Select country…",
haveacc:"Already have an account? Log in",noacc:"New here? Create an account",authsub:"Create an account to browse the archive and add cars. Your email is never shown. Only admins can see your username and country.",
taken:"That username is taken.",checkmail:"Check your email to confirm your account, then log in.",admin:"Admin",pending:"pending",approved:"approved",rejected:"rejected",users:"Users",
approve:"Approve",reject:"Reject",del:"Delete",ban:"Ban",unban:"Unban",mkadmin:"Make admin",rmadmin:"Remove admin",sure:"Are you sure? This cannot be undone.",banned:"Your account has been suspended.",loading:"Loading…",
pendingnote:"Thanks! Your car will appear once an admin approves it.",by:"Added by",status:"Status",carcol:"Car",role:"Role",joined:"Joined",actions:"Actions",noaccess:"You don’t have access to this page."});
Object.assign(T.el,{login:"Σύνδεση",signup:"Δημιουργία λογαριασμού",logout:"Αποσύνδεση",email:"Email",password:"Κωδικός (8+ χαρακτήρες)",username:"Όνομα χρήστη (γράμματα, αριθμοί, _)",country:"Χώρα",selcountry:"Επιλέξτε χώρα…",
haveacc:"Έχετε ήδη λογαριασμό; Σύνδεση",noacc:"Νέος εδώ; Δημιουργήστε λογαριασμό",authsub:"Δημιουργήστε λογαριασμό για να δείτε το αρχείο και να προσθέσετε αυτοκίνητα. Το email σας δεν εμφανίζεται ποτέ. Μόνο οι διαχειριστές βλέπουν όνομα χρήστη και χώρα.",
taken:"Αυτό το όνομα χρήστη χρησιμοποιείται ήδη.",checkmail:"Ελέγξτε το email σας για επιβεβαίωση και μετά συνδεθείτε.",admin:"Διαχείριση",pending:"σε αναμονή",approved:"εγκεκριμένο",rejected:"απορριφθέν",users:"Χρήστες",
approve:"Έγκριση",reject:"Απόρριψη",del:"Διαγραφή",ban:"Αποκλεισμός",unban:"Άρση αποκλεισμού",mkadmin:"Κάντε διαχειριστή",rmadmin:"Αφαίρεση διαχειριστή",sure:"Είστε σίγουροι; Δεν γίνεται αναίρεση.",banned:"Ο λογαριασμός σας έχει ανασταλεί.",loading:"Φόρτωση…",
pendingnote:"Ευχαριστούμε! Το αυτοκίνητο θα εμφανιστεί μόλις το εγκρίνει διαχειριστής.",by:"Προσθήκη από",status:"Κατάσταση",carcol:"Αυτοκίνητο",role:"Ρόλος",joined:"Εγγραφή",actions:"Ενέργειες",noaccess:"Δεν έχετε πρόσβαση σε αυτή τη σελίδα."});

let L="en",me=null,prof=null,ready=false,CARS=[],F={b:"",y:"",q:""},files=[],mode="login",adm={tab:"cars",cars:[],users:[],loaded:false};
try{L=localStorage.getItem("gr-lang")||"en"}catch(e){}
const $=id=>document.getElementById(id),t=k=>T[L][k];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const isAdmin=()=>!!prof&&prof.role==="admin";
const CC="GR AD AE AF AG AL AM AO AR AT AU AZ BA BB BD BE BF BG BH BI BJ BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FR GA GB GD GE GH GM GN GQ GT GW GY HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KM KP KR KW KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MK ML MM MN MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NZ OM PA PE PG PH PK PL PT PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TM TN TO TR TT TZ UA UG US UY UZ VA VE VN VU WS YE ZA ZM ZW".split(" ");
const cname=c=>{try{return new Intl.DisplayNames([L],{type:"region"}).of(c)}catch(e){return c}};
const countries=()=>["GR",...CC.filter(c=>c!=="GR").sort((a,b)=>cname(a).localeCompare(cname(b),L))];
const purl=p=>db.storage.from("car-photos").getPublicUrl(p).data.publicUrl;
const imgs=c=>(c.photos||[]).map(purl);
const mask=p=>esc(String(p||"").slice(0,3))+"••••";
const plate=p=>`<span class="plate"><i>EL</i><b>${mask(p)}</b></span>`;
const sw=c=>{const u=imgs(c)[0];return `<div class="swatch" style="background:${u?`#0D2238 center/cover no-repeat url('${esc(u)}')`:"linear-gradient(135deg,#1B5E9B,#0D2238)"}">${u?"":`<em>${esc((c.brand||"?")[0])}</em>`}${plate(c.plate_prefix)}</div>`};
const opts=(a,sel)=>a.map(x=>`<option${String(sel)===String(x)?" selected":""}>${esc(x)}</option>`).join("");

/* ---------- data ---------- */
async function loadCars(){const r=await db.from("cars").select("*").eq("status","approved").order("created_at",{ascending:false});CARS=r.data||[]}
async function loadAdmin(){const [c,u]=await Promise.all([db.from("cars").select("*,profiles(username,country)").order("created_at",{ascending:false}),db.from("profiles").select("*").order("created_at",{ascending:false})]);
adm.cars=c.data||[];adm.users=u.data||[];adm.loaded=true;render()}
async function setSession(s){if(ready&&s&&me&&s.user.id===me.id)return;
me=s?s.user:null;prof=null;CARS=[];adm.loaded=false;
if(me){const r=await db.from("profiles").select("*").eq("id",me.id).single();prof=r.data}
if(me||!REQUIRE_LOGIN)await loadCars();
ready=true;render()}

/* ---------- views ---------- */
function authView(){const su=mode==="signup";
return `<section class="page"><h1>${t(su?"signup":"login")}</h1><p>${t("authsub")}</p><form class="f" id="af">${su?`<label>${t("username")}<input name="username" required minlength="3" maxlength="20" pattern="[A-Za-z0-9_]+" autocomplete="username"></label><label>${t("country")}<select name="country" required><option value="">${t("selcountry")}</option>${countries().map(c=>`<option value="${c}">${esc(cname(c))}</option>`).join("")}</select></label>`:""}<label>${t("email")}<input name="email" type="email" required autocomplete="email"></label><label>${t("password")}<input name="password" type="password" required minlength="8" autocomplete="${su?"new-password":"current-password"}"></label><button class="btn">${t(su?"signup":"login")}</button><p id="am" class="note" hidden></p></form><p><button class="lnk" id="sw">${t(su?"haveacc":"noacc")}</button></p></section>`}
function home(){const br=new Set(CARS.map(c=>c.brand)).size,md=new Set(CARS.map(c=>c.brand+"|"+c.model)).size;
return `<section class="hero"><div><h1>${t("h")}</h1><p>${t("sub")}</p><a class="btn" href="#archive">${t("browse")}</a> <button class="btn alt" data-add>${t("add")}</button></div><div class="stage"><span class="plate"><i>EL</i><b>ΑΒΕ ••••</b></span></div></section><div class="stats"><div><b>${CARS.length}</b>${t("cars")}</div><div><b>${br}</b>${t("makes")}</div><div><b>${md}</b>${t("models")}</div></div>`}
function archive(){const bs=[...new Set(CARS.map(c=>c.brand))].sort(),ys=[...new Set(CARS.map(c=>c.year))].filter(Boolean).sort().reverse(),q=F.q.toUpperCase();
const list=CARS.filter(c=>(!F.b||c.brand===F.b)&&(!F.y||c.year==F.y)&&(!q||String(c.plate_prefix||"").startsWith(q)));
return `<h2 class="ah">${t("archive")}</h2><div class="filters"><select id="fb" aria-label="${t("brand")}"><option value="">${t("allb")}</option>${opts(bs,F.b)}</select><select id="fy" aria-label="${t("year")}"><option value="">${t("ally")}</option>${opts(ys,F.y)}</select><input id="fq" maxlength="3" placeholder="${t("plate")}" value="${esc(F.q)}" aria-label="${t("plate")}"><button class="btn alt" id="fx" aria-label="Clear">×</button><button class="btn" data-add>${t("add")}</button></div><div class="grid">${list.length?list.map(c=>`<a class="card" href="#car-${esc(c.id)}">${sw(c)}<div class="info"><h3>${esc(c.brand)} ${esc(c.model)}</h3><p>${esc(c.year)}${c.color?" · "+esc(c.color):""}</p></div></a>`).join(""):`<div class="empty">${t("none")}</div>`}</div>`}
function carView(id){const c=CARS.concat(adm.cars).find(x=>x.id===id);if(!c)return archive();
const u=imgs(c),v=[c.brand,c.model,c.year,c.color,c.interior,c.drive,c.notes];
const g=u.length?`<div class="gal"><img id="gi" src="${esc(u[0])}" alt="">${u.length>1?`<div class="thumbs">${u.map((x,i)=>`<button data-s="${esc(x)}"${i?"":' class="on"'}><img src="${esc(x)}" alt=""></button>`).join("")}</div>`:""}</div>`:sw(c);
return `<div class="crumbs"><a href="#archive">${t("back")}</a> / ${esc(c.brand)} ${esc(c.model)}</div><div class="detail"><div>${g}</div><div><h1>${esc(c.brand)} ${esc(c.model)}</h1><dl>${t("spec").map((k,i)=>v[i]?`<dt>${k}</dt><dd>${esc(v[i])}</dd>`:"").join("")}</dl><p class="note">${t("maskn")}</p>${isAdmin()?`<p><button class="btn danger" data-a="delete" data-id="${esc(c.id)}">${t("rmcar")}</button></p>`:""}</div></div>`}
const page=(k,p)=>`<section class="page"><h1>${t(k)}</h1><p>${t(p)}</p>${k==="cth"?`<p><a class="btn" href="${IG}" target="_blank" rel="noopener">Instagram @gr_registry</a></p><h2>${t("rm")}</h2><p>${t("rmp")}</p>`:""}</section>`;
function adminView(){if(!isAdmin())return `<section class="page"><h1>${t("admin")}</h1><p>${t("noaccess")}</p></section>`;
if(!adm.loaded){loadAdmin();return `<p class="empty" style="margin-top:40px">${t("loading")}</p>`}
const np=adm.cars.filter(c=>c.status==="pending").length,tb=(k,l)=>`<button data-tab="${k}" class="${adm.tab===k?"on":""}">${l}</button>`;
const btn=(a,id,l,x="")=>`<button class="btn ${x}" data-a="${a}" data-id="${esc(id)}">${t(l)}</button>`;
const rows=adm.tab==="cars"
?`<tr><th>${t("carcol")}</th><th>${t("by")}</th><th>${t("status")}</th><th>${t("actions")}</th></tr>`+adm.cars.map(c=>`<tr><td><a href="#car-${esc(c.id)}">${esc(c.brand)} ${esc(c.model)} ${esc(c.year)}</a> (${(c.photos||[]).length} ${t("photos").split(" ")[0].toLowerCase()})</td><td>${c.profiles?"@"+esc(c.profiles.username)+" · "+esc(cname(c.profiles.country)):""}</td><td>${t(c.status)}</td><td>${c.status!=="approved"?btn("approve",c.id,"approve"):""}${c.status==="pending"?btn("reject",c.id,"reject","alt"):""}${btn("delete",c.id,"del","danger")}</td></tr>`).join("")
:`<tr><th>${t("username")}</th><th>${t("country")}</th><th>${t("role")}</th><th>${t("joined")}</th><th>${t("actions")}</th></tr>`+adm.users.map(u=>`<tr><td>@${esc(u.username)}${u.banned?" ("+t("ban").toLowerCase()+")":""}</td><td>${esc(cname(u.country))}</td><td>${esc(u.role)}</td><td>${esc(String(u.created_at).slice(0,10))}</td><td>${u.id===me.id?"":btn(u.banned?"unban":"ban",u.id,u.banned?"unban":"ban","alt")+btn(u.role==="admin"?"rmadmin":"mkadmin",u.id,u.role==="admin"?"rmadmin":"mkadmin","alt")}</td></tr>`).join("");
return `<h2 class="ah">${t("admin")}</h2><div class="tabs">${tb("cars",`${t("cars")} (${np} ${t("pending")})`)}${tb("users",`${t("users")} (${adm.users.length})`)}</div><div class="tw"><table>${rows}</table></div>`}

/* ---------- render ---------- */
function nav(r){$("nav").innerHTML=["home","archive","contact"].concat(isAdmin()?["admin"]:[]).map(x=>`<a href="#${x}"${r===x||(x==="archive"&&r.startsWith("car-"))?' class="on"':""}>${t(x)}</a>`).join("");
$("usr").innerHTML=me&&prof?`<span class="who">@${esc(prof.username)} · ${esc(cname(prof.country))}</span><button class="lnk" id="lo">${t("logout")}</button>`:(me||!ready?"":`<a class="btn alt" href="#join">${t("login")}</a>`);
if($("lo"))$("lo").onclick=()=>db.auth.signOut();
$("fl").textContent=t("legal");$("fc").textContent=t("contact");$("copy").textContent=t("copy");$("own").textContent=t("own");
document.querySelectorAll(".lang button").forEach(b=>b.className=b.dataset.l===L?"on":"");document.documentElement.lang=L}
function render(){const r=location.hash.slice(1)||"home";let h;
if(!ready)h=`<p class="empty" style="margin-top:40px">${t("loading")}</p>`;
else if(r==="legal")h=page("lg","lgp");else if(r==="contact")h=page("cth","ctp");
else if(!me&&(REQUIRE_LOGIN||r==="join"))h=authView();
else if(prof&&prof.banned)h=`<section class="page"><h1>${t("banned")}</h1></section>`;
else if(r==="admin")h=adminView();else if(r==="archive")h=archive();else if(r.startsWith("car-"))h=carView(r.slice(4));else h=home();
nav(r);$("app").innerHTML=h;
if($("af")){$("af").onsubmit=authSubmit;$("sw").onclick=()=>{mode=mode==="login"?"signup":"login";render()}}
if($("fb")){$("fb").onchange=e=>{F.b=e.target.value;render()};$("fy").onchange=e=>{F.y=e.target.value;render()};
$("fq").oninput=e=>{F.q=e.target.value;const p=e.target.selectionStart;render();const n=$("fq");n.focus();n.setSelectionRange(p,p)};$("fx").onclick=()=>{F={b:"",y:"",q:""};render()}}
const gi=$("gi");if(gi)document.querySelectorAll(".thumbs button").forEach(b=>b.onclick=()=>{gi.src=b.dataset.s;document.querySelectorAll(".thumbs button").forEach(o=>o.className="");b.className="on"});
document.querySelectorAll("[data-add]").forEach(b=>b.onclick=openAdd)}

/* ---------- auth ---------- */
async function authSubmit(e){e.preventDefault();const v=new FormData(e.target),m=$("am");m.hidden=false;m.textContent=t("saving");
if(mode==="login"){const {error}=await db.auth.signInWithPassword({email:v.get("email"),password:v.get("password")});if(error)m.textContent=error.message;else location.hash="#home";return}
const un=String(v.get("username")).trim(),ok=await db.rpc("username_available",{u:un});
if(!ok.data){m.textContent=t("taken");return}
const {data,error}=await db.auth.signUp({email:v.get("email"),password:v.get("password"),options:{data:{username:un,country:v.get("country")}}});
if(error){m.textContent=error.message;return}
if(!data.session)m.textContent=t("checkmail")}

/* ---------- add a car ---------- */
function setOk(m){const o=$("ok");o.textContent=m;o.hidden=!m}
function pv(){const p=$("pv");p.innerHTML="";
files.forEach((f,i)=>{const d=document.createElement("div"),im=document.createElement("img"),b=document.createElement("button");im.src=URL.createObjectURL(f);im.alt="";b.type="button";b.textContent="×";b.setAttribute("aria-label",t("remove"));b.onclick=()=>{files.splice(i,1);pv()};d.append(im,b);p.append(d)});
$("pc").textContent=files.length+"/"+PHOTO_LIMIT;$("pb").disabled=files.length>=PHOTO_LIMIT}
function openAdd(){if(!me){mode="login";location.hash="#join";return}
files=[];pv();$("ph2").hidden=true;setOk("");$("dt").textContent=t("add");
document.querySelectorAll("[data-k]").forEach(s=>s.textContent=t(s.dataset.k));
$("cx").textContent=t("cancel");$("sb").textContent=t("submit");$("pb").textContent=t("addph");$("pl").textContent=t("photos");$("sb").disabled=false;$("dlg").showModal()}
const shrink=f=>new Promise((res,rej)=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const s=Math.min(1,1600/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);c.toBlob(b=>{URL.revokeObjectURL(u);b?res(b):rej()},"image/jpeg",.85)};im.onerror=rej;im.src=u});
async function submitCar(e){e.preventDefault();const f=e.target,b=$("sb");b.disabled=true;setOk(t("saving"));
try{const paths=[];
for(const file of files){const p=`${me.id}/${crypto.randomUUID()}.jpg`,{error}=await db.storage.from("car-photos").upload(p,await shrink(file),{contentType:"image/jpeg"});if(error)throw error;paths.push(p)}
const v=new FormData(f),g=(k,n)=>String(v.get(k)||"").trim().slice(0,n);
const {error}=await db.from("cars").insert({brand:g("brand",50),model:g("model",60),year:parseInt(g("year",4),10)||null,plate_prefix:g("plate",8).toUpperCase().slice(0,3),color:g("color",40),interior:g("interior",40),drive:g("drive",3),notes:g("notes",300),photos:paths,status:isAdmin()?"approved":"pending"});
if(error)throw error;
files=[];f.reset();pv();setOk(isAdmin()?"":t("pendingnote"));await loadCars();adm.loaded=false;render();if(isAdmin())$("dlg").close()}
catch(x){console.error(x);setOk(t("err"))}b.disabled=false}

/* ---------- admin actions ---------- */
async function act(a,id){
if(a==="delete"){if(!confirm(t("sure")))return;const c=adm.cars.concat(CARS).find(x=>x.id===id);
if(c&&c.photos&&c.photos.length)await db.storage.from("car-photos").remove(c.photos);
await db.from("cars").delete().eq("id",id);if(location.hash.startsWith("#car-"))location.hash="#archive"}
else if(a==="approve"||a==="reject")await db.from("cars").update({status:a==="approve"?"approved":"rejected"}).eq("id",id);
else if(a==="ban"||a==="unban")await db.from("profiles").update({banned:a==="ban"}).eq("id",id);
else if(a==="mkadmin"||a==="rmadmin")await db.from("profiles").update({role:a==="mkadmin"?"admin":"user"}).eq("id",id);
adm.loaded=false;await loadCars();render()}

/* ---------- start ---------- */
$("app").onclick=e=>{const a=e.target.closest("[data-a]"),tb=e.target.closest("[data-tab]");if(a)act(a.dataset.a,a.dataset.id);if(tb){adm.tab=tb.dataset.tab;render()}};
$("cx").onclick=()=>$("dlg").close();$("addf").onsubmit=submitCar;$("pb").onclick=()=>$("pf").click();
$("pf").onchange=e=>{const room=PHOTO_LIMIT-files.length,a=[...e.target.files].filter(f=>/^image\//.test(f.type)),n=$("ph2");
n.textContent=t("limit");n.hidden=a.length<=room;files=files.concat(a.slice(0,room));e.target.value="";pv()};
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{L=b.dataset.l;try{localStorage.setItem("gr-lang",L)}catch(e){}render()});
window.addEventListener("hashchange",()=>{window.scrollTo(0,0);render()});
db.auth.onAuthStateChange((_e,s)=>setTimeout(()=>setSession(s),0));
render();
