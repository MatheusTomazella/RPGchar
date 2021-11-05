const skillCont = document.getElementById("skills-list"); 

function randomColor ( ) {
    const colors = [ "red", "green", "yellow", "orange", "purple", "teal" ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

let list;
function populateSkills ( templateSkills, charSkills ) {
    clearSkills();
    fillSkills(templateSkills, false);
    fillSkills(charSkills, true);
    list = new List("skills", {valueNames:[ "name", "expr" ], item:'<li class="skill"><div><h6 class="name"></h6><span class="expr"></span></div><button></button></li>'});
}
function fillSkills ( skills, editable = false ) {
    skills.forEach( skill => { 
        const item = document.createElement("li");
        item.dataset.name = skill.name;
        item.classList.add("skill");
        if ( editable ) { 
            item.addEventListener("click", () => { 
                openAndFillSkillModal(skill.name)
            } );
            item.classList.add("editable");
        }
        const div = document.createElement("div");
        const name = document.createElement("h6");
        name.classList.add("name");
        name.innerHTML = skill.name;
        const span = document.createElement("span");
        span.innerText = skill.expr;
        div.appendChild(name);
        div.appendChild(span);
        span.classList.add("expr");
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-flat");
        button.classList.add("waves-effect");
        button.classList.add("waves-light");
        button.classList.add(randomColor());
        button.innerHTML = '<i class="fas fa-dice-d20 white-text"></i>';
        button.addEventListener("click", (e) => { roll(skill); e.stopPropagation(); });
        item.appendChild(div);
        item.appendChild(button);
        skillCont.appendChild(item);
    } );
}

function clearSkills ( ) {
    document.getElementById("skills-list").innerHTML = `
    <li class="w100 row center">
        <button class="btn btn-flat deep-orange-text text-accent-1 w100 row center align-center text-center edit-skills"
        style="border: solid #ff9e80 1px;" onclick="openAndFillSkillModal(undefined);">
            <i class="small material-icons" style="margin-right: 1rem;">add</i>
            Adicionar
        </button>
    </li>`;
}

function animateDice ( ) {
    document.getElementById("dice").classList.remove("dice-animation");
    document.getElementById("anfitras").classList.remove("anfitras");
    document.getElementById("dice").classList.add("dice-animation");
    document.getElementById("anfitras").classList.add("anfitras");
    setTimeout(() => {
        document.getElementById("dice").classList.remove("dice-animation");
        document.getElementById("anfitras").classList.remove("anfitras");
    }, 3000 );
}

function clearModifiers ( ) {
    document.getElementById("mod1").value = "";
    document.getElementById("mod2").value = "";
    document.getElementById("mod3").value = "";
}
function getModifier ( id ) {
    if ( !id ) return undefined;
    if ( id == "mod1" || id == "mod2" || id == "mod3" ) return document.getElementById(id).value | 0;
    return undefined;
}
function replaceStats ( expr ) { 
    let safe_T = 0;
    let result = expr;
    let toReplace = expr.split(/[\[\]]/);
    if ( !toReplace[1] ) return result;
    else toReplace = toReplace[1];
    while ( toReplace && safe_T < 100 ) { 
        const value = getModifier(toReplace) | getStat(toReplace);
        result = result.replace(`[${toReplace}]`, value);
        toReplace = result.split(/[\[\]]/)[1];
        safe_T++;
    }
    return result;
}

let lastSkill = {expr: "d20", name: "d20"};
function roll ( skill ) { 
    console.log(replaceStats(skill.expr));
    const result = dice.roll(replaceStats(skill.expr));
    document.getElementById("dice-result").innerHTML = `${result.total} ${(skill.sucessLevel) ? `<br><h6 style="text-align:center;margin:0;font-weight:500;">${skill.sucessLevel(result)}</h6>` : ""}`;
    setTimeout(() => { addToLog(`<b>${skill.name}</b>: ${result}`); }, 2000 );
    lastSkill = skill;
    animateDice();
    clearModifiers();
}

function reroll ( ) { 
    roll(lastSkill);
}