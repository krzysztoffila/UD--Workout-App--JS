class t{date=new Date;id=(Date.now()+"").slice(-10);constructor(t,e,o){this.coords=t,this.distance=e,this.duration=o}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} ${this.date.getDate()}`}}class e extends t{type="running";constructor(t,e,o,s){super(t,e,o),this.cadence=s,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class o extends t{type="cycling";constructor(t,e,o,s){super(t,e,o),this.elevationGain=s,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=this.distance/(this.duration/60),this.speed}}const s=document.querySelector(".form"),a=document.querySelector(".workouts"),i=document.querySelector(".form__input--type"),n=document.querySelector(".form__input--distance"),r=document.querySelector(".form__input--duration"),u=document.querySelector(".form__input--cadence"),l=document.querySelector(".form__input--elevation");new class{#t;#e;#o=13;#s=[];constructor(){this._getPosition(),this._getLocalStorage(),s.addEventListener("submit",this._newWorkout.bind(this)),i.addEventListener("change",this._toggleElewationField),a.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){alert("Could not get your position")})}_loadMap(t){let{latitude:e,longitude:o}=t.coords;this.#t=L.map("map").setView([e,o],this.#o),L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#s.forEach(t=>{this._renderWorkoutMarker(t)})}_showForm(t){this.#e=t,s.classList.remove("hidden"),n.focus()}_hideForm(){n.value=r.value=u.value=l.value="",s.style.display="none",s.classList.add("hidden"),setTimeout(()=>s.style.display="grid",1e3)}_toggleElewationField(){l.closest(".form__row").classList.toggle("form__row--hidden"),u.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){let s;let a=(...t)=>t.every(t=>Number.isFinite(t)),c=(...t)=>t.every(t=>t>0);t.preventDefault();let p=i.value,d=+n.value,_=+r.value,{lat:h,lng:m}=this.#e.latlng;if("running"===p){let t=+u.value;if(!a(d,_,t)||!c(d,_,t))return alert("Inputs have to be positive numbers!");s=new e([h,m],d,_,t)}if("cycling"===p){let t=+l.value;if(!a(d,_,t)||!c(d,_))return alert("Inputs have to be positive numbers!");s=new o([h,m],d,_,t)}this.#s.push(s),this._renderWorkout(s),this._renderWorkoutMarker(s),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){let{coords:e,type:o,description:s}=t;L.marker(e).addTo(this.#t).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${o}-popup`})).setPopupContent(`${"running"===o?"\uD83C\uDFC3‍♂️":"\uD83D\uDEB4‍♀️"} ${s}`).openPopup()}_renderWorkout(t){let e=`
      <li class="workout workout--${t.type}" data-id="${t.id}">
        <h2 class="workout__title">${t.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${"running"===t.type?"\uD83C\uDFC3‍♂️":"\uD83D\uDEB4‍♀️"}</span>
          <span class="workout__value">${t.distance}</span>
          <span class="workout__unit">km</span>    
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{23F1}</span>
          <span class="workout__value">${t.duration}</span>
          <span class="workout__unit">min</span>
        </div>
      `;"running"===t.type&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">\u{26A1}\u{FE0F}</span>
          <span class="workout__value">${t.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{1F9B6}\u{1F3FC}</span>
          <span class="workout__value">${t.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `),"cycling"===t.type&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">\u{26A1}\u{FE0F}</span>
          <span class="workout__value">${t.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{26F0}</span>
          <span class="workout__value">${t.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `),s.insertAdjacentHTML("afterend",e)}_moveToPopup(t){let e=t.target.closest(".workout");if(!e)return;let o=this.#s.find(t=>t.id===e.dataset.id);this.#t.setView(o.coords,this.#o,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#s))}_getLocalStorage(){let t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#s=t,this.#s.forEach(t=>{this._renderWorkout(t)}))}reset(){localStorage.removeItem("workouts"),location.reload()}};
//# sourceMappingURL=index.a7977eb3.js.map
