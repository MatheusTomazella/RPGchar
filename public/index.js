let templateData;
let charData;
function init ( ) {
    $.ajax({
        type: "GET",
        url: `/char/${new URLSearchParams(window.location.search).get("id")}`,
        success: char => {
            charData = char;
            charData.data = JSON.parse(char.data);
            charData.skills = JSON.parse(char.skills);
            $.ajax({
                type: "GET",
                url: `/template/${char.template}`,
                success: template => {
                    templateData = template;
                    templateData.data = JSON.parse(template.data);
                    templateData.skills = JSON.parse(template.skills);
                    populateSkills(templateData.skills, charData.skills);
                    initSheet();
                    $(".modal").modal();
                },
                error: error => {
                    console.error(error);
                    $("#sheet").innerHtml = "Problema ao buscar dados: \n"+error;
                }
            });
        },
        error: error => {
            console.error(error);
            $("#sheet").innerHtml = "Problema ao buscar dados: \n"+error;
        }
    });
}

async function save ( ) { 
    console.log("Saving");
    $.ajax({
        type: "PUT",
        url: `/char/${charData.id}`,
        contentType: "application/json",
        data: JSON.stringify(getObjectToSave()),
        success: function (response) {
            console.log("Saved");
            // console.log(response);
        },
        error: console.error
    });
}

init();

const autoSave = setInterval( save, 1000*60*1 );
document.addEventListener("keydown", (e) => { 
    if(e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        save();
    }
} );
window.addEventListener("beforeunload", save);