let skillToEdit;

function openAndFillSkillModal ( name ) {
    skillToEdit = name;
    M.Modal.getInstance($("#skill-modal")).open();
    let values = { name: "", expr: "" };
    if ( name ) values = list.get("name", name)[0]._values;
    document.getElementById("skill-name").value = values.name;
    document.getElementById("skill-expr").value = values.expr;
}

function saveSkill ( ) {
    let values = { name: document.getElementById("skill-name").value, expr: document.getElementById("skill-expr").value };
    if ( skillToEdit ) charData.skills.forEach( (skill) => { 
        if ( skill.name == skillToEdit ) {
            skill.name = values.name;
            skill.expr = values.expr;
        }
    } );
    else charData.skills.push( values );
    populateSkills(templateData.skills, charData.skills);
}

function deleteSkill ( name ) { 
    charData.skills.forEach( (skill, index) => { 
        if ( skill.name == name ) charData.skills.splice(index, 1);
    } );
    populateSkills(templateData.skills, charData.skills);
}