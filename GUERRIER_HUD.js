var currentDisplay = "passive";


//ACTIVE COMPETENCE
var currentDomain = "DEFENCE"; // Par défaut, le domaine est DEFENCE
var currentSubdomain = "Lumière"; // Par défaut, le sous-domaine est Lumière



var labelId; //var temp pour passer les id dans currentComponentIds
var currentComponentIds = [];//lsite de id de component en cours

var gui;
var player;

var player_skill_point

var skillLevels;
var numSkills = 18;

var UpskillButtonMap = [];
var DownskillButtonMap = [];

var columnWidth = 110;

var xLeftColumn = -130;
var xRightColumn = 160;
    
var skills_liste=[
"Résistance aux Explosions",
"Résistance aux Dégâts",
"Résistance au Recul",
"Résistance à la Magie",
"Augmentation des PV",
"Résistance au Feu",
"Hauteur de Saut",
"Vitesse",
"Résistance aux Chutes",
"Endurance",
"Dégâts Furtifs",
"Vitesse de Nage",
"Dégâts",
"Vitesse d'Attaque",
"Recul",
"Puissance des Capacités",
"Chance Critique",
"Pénétration d'Armure"
]

var skills = {
    DEFENCE: {
        Lumière: [
            { id: 300, name: "Compétence Lumière 1" },
            { id: 301, name: "Compétence Lumière 2" },
            { id: 303, name: "Compétence Lumière 2" },
            { id: 304, name: "Compétence Lumière 2" },
            { id: 305, name: "Compétence Lumière 2" },
            { id: 306, name: "Compétence Lumière 2" },
            // ... et ainsi de suite jusqu'à 6
        ],
        Terre: [
            { id: 310, name: "Compétence Terre 1" },
            { id: 311, name: "Compétence Terre 1" },
            { id: 312, name: "Compétence Terre 1" },
            { id: 313, name: "Compétence Terre 1" },
            { id: 314, name: "Compétence Terre 1" },
            { id: 315, name: "Compétence Terre 1" },
        ],
        Electrique: [
            { id: 320, name: "Compétence Terre 1" },
            { id: 321, name: "Compétence Terre 1" },
            { id: 322, name: "Compétence Terre 1" },
            { id: 323, name: "Compétence Terre 1" },
            { id: 324, name: "Compétence Terre 1" },
            { id: 325, name: "Compétence Terre 1" },
        ],
        Feu: [
            { id: 330, name: "Compétence Terre 1" },
            { id: 331, name: "Compétence Terre 1" },
            { id: 332, name: "Compétence Terre 1" },
            { id: 333, name: "Compétence Terre 1" },
            { id: 334, name: "Compétence Terre 1" },
            { id: 335, name: "Compétence Terre 1" },
        ],
    },
    MOBILITE: {
        Vent: [
            { id: 340, name: "Compétence Vent 1" },
            { id: 341, name: "Compétence Vent 1" },
            { id: 342, name: "Compétence Vent 1" },
            { id: 343, name: "Compétence Vent 1" },
            { id: 344, name: "Compétence Vent 1" },
            { id: 345, name: "Compétence Vent 1" },
        ],
        Vide: [
            { id: 350, name: "Compétence Vent 1" },
            { id: 351, name: "Compétence Vent 1" },
            { id: 352, name: "Compétence Vent 1" },
            { id: 353, name: "Compétence Vent 1" },
            { id: 354, name: "Compétence Vent 1" },
            { id: 355, name: "Compétence Vent 1" },
        ],
    },
    ATTAQUE: {
        Vide: [
            { id: 360, name: "Compétence Vide 1" },
            { id: 361, name: "Compétence Vide 1" },
            { id: 362, name: "Compétence Vide 1" },
            { id: 363, name: "Compétence Vide 1" },
            { id: 364, name: "Compétence Vide 1" },
            { id: 365, name: "Compétence Vide 1" },
        ],
        Sang: [
            { id: 370, name: "Compétence Vide 1" },
            { id: 371, name: "Compétence Vide 1" },
            { id: 372, name: "Compétence Vide 1" },
            { id: 373, name: "Compétence Vide 1" },
            { id: 374, name: "Compétence Vide 1" },
            { id: 375, name: "Compétence Vide 1" },
        ],
        Vent: [
            { id: 380, name: "Compétence Vide 1" },
            { id: 381, name: "Compétence Vide 1" },
            { id: 382, name: "Compétence Vide 1" },
            { id: 383, name: "Compétence Vide 1" },
            { id: 384, name: "Compétence Vide 1" },
            { id: 385, name: "Compétence Vide 1" },
        ],
        Feu: [
            { id: 390, name: "Compétence Vide 1" },
            { id: 391, name: "Compétence Vide 1" },
            { id: 392, name: "Compétence Vide 1" },
            { id: 393, name: "Compétence Vide 1" },
            { id: 394, name: "Compétence Vide 1" },
            { id: 395, name: "Compétence Vide 1" },
        ],
    }
};



function init(e){
    e.block.setModel("enderskills:altar_ultimate");
    
}


    
function interact(e) {
    player = e.player;
    import_player_skill(e,player) //importe les données du joueur
    

    gui = e.API.createCustomGui(1, 255, 255, false);
    //gui.addTexturedRect(2, "minecraft:textures/gui/demo_background.png", 0, 0, 255, 255);
        
    gui.addButton(900, "Compétences Passives", -30, -50, 150, 20);
    gui.addButton(901, "Compétences Actives", 140, -50, 150, 20);


  
    // Affichage des compétences en fonction de l'état actuel
    if (currentDisplay === "passive") {
        displayPassiveSkills();
    } else {
        displayActiveSkills();
    }
    
    player.showCustomGui(gui);
}



function customGuiButton(e) {
    var edit = false;

    var buttonId = e.buttonId;
    var indice = UpskillButtonMap.indexOf(buttonId);
    

    if (e.buttonId === 900 && currentDisplay !== "passive") {
        currentDisplay = "passive";
        displayPassiveSkills();
        player.showCustomGui(gui);
    } else if (e.buttonId === 901 && currentDisplay !== "active") {
        currentDisplay = "active";
        displayActiveSkills();
        player.showCustomGui(gui);
    }
    
    change_domain_and_sousdomain(e);
    
    var edit = edit_player_skill_point(e.buttonId);
    if(edit){
        // Actualisez le GUI en utilisant la méthode update du joueur
        e.player.showCustomGui(gui);
        edit_player_stats(e,player);
        edit_player_skills(e,player);
    }
}


    function change_domain_and_sousdomain(e){
    
    // Gestion des boutons du sommaire des compétences actives
    if (e.buttonId === 910) {
        currentDomain = "DEFENCE";
        currentSubdomain = "Lumière"; // Par défaut pour DEFENCE
        
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
    } else if (e.buttonId === 911) {
        currentDomain = "MOBILITE";
        currentSubdomain = "Vent"; // Par défaut pour MOBILITE
        
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
    } else if (e.buttonId === 912) {
        currentDomain = "ATTAQUE";
        currentSubdomain = "Vide"; // Par défaut pour ATTAQUE
        
        
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
    } else if (e.buttonId >= 920 && e.buttonId <= 923) {
        currentSubdomain = ["Lumière", "Terre", "Electrique", "Feu"][e.buttonId - 920];
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
        
    } else if (e.buttonId >= 930 && e.buttonId <= 931) {
        currentSubdomain = ["Vent", "Vide"][e.buttonId - 930];
        
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
    } else if (e.buttonId >= 940 && e.buttonId <= 943) {
        currentSubdomain = ["Vide", "Sang", "Vent", "Feu"][e.buttonId - 940];
        
        // Mettez à jour l'affichage après avoir changé de domaine ou de sous-domaine
        displayActiveSkills();
        player.showCustomGui(gui);
    }
    
    
}



function edit_player_skill_point(buttonId) {
    var edit = false;
    var indice = UpskillButtonMap.indexOf(buttonId);

    if (indice !== -1) {
        if(player_skill_point > 0){
            if(skillLevels[indice-1] < 9){
                // Augmentez le niveau de la compétence 1 lorsque le bouton + est cliqué
                skillLevels[indice-1]++;
                player_skill_point--
            
                edit = true
            }else{
                player.message("Lvl max");
            }
        }else{
            player.message("Vous n'avez plus de point");
        }
    }

    
    var indice = DownskillButtonMap.indexOf(buttonId);
    if (indice !== -1) {
        // Diminuez le niveau de la compétence 1 lorsque le bouton * est cliqué
        if(skillLevels[indice-1] > 0){
            skillLevels[indice-1]--;
            player_skill_point++
                
            edit = true
        }
    }
    
    
    // Supprimez les anciens labels de niveau
    for (var i = 1; i <= numSkills; i++) {
        gui.removeComponent(i * 4-2); // Supprime les labels de niveau
    }

    // Ajoutez les nouveaux labels de niveau avec les valeurs mises à jour
    for (var i = 1; i <= numSkills; i++) {
        var col = i <= 9 ? 0 : 1; // Colonne 0 (gauche) pour les compétences de 1 à 9, Colonne 1 (droite) pour les compétences de 10 à 18
        var row = i <= 9 ? i : i - 9; // Ligne de 1 à 9 dans la colonne de gauche, de 1 à 9 dans la colonne de droite

        var xPos = col === 0 ? xLeftColumn : xRightColumn;

        // Affichage du niveau de compétence mis à jour
        labelId = gui.addLabel(i * 4 - 2, skillLevels[i - 1].toString(), xPos + 150, 50 + (row - 1) * 25, 50, 25);
        currentComponentIds.push(labelId);
    }
    
    // Affichage du nombre de points du joueur
    gui.removeComponent(100);
    labelId = gui.addLabel(100, "Point a assignée : "+player_skill_point, 75, 10, 100, 25);
    currentComponentIds.push(labelId);

    return edit;
}


// Fonction pour afficher les compétences passives
function displayPassiveSkills() {
    // Code pour afficher les compétences passives (similaire à ce que vous avez déjà)
    clearCurrentComponents();

    labelId = gui.addLabel(100, "Point a assignée : " + player_skill_point, 75, 10, 100, 25);
    currentComponentIds.push(labelId);
    
    // Ajoute le label "Lvl" au-dessus de la colonne de gauche
    labelId = gui.addLabel(401, "Lvl", xLeftColumn + 146, 30, 50, 25);
    currentComponentIds.push(labelId);
    
    // Ajoute le label "Lvl" au-dessus de la colonne de droite
    labelId = gui.addLabel(402, "Lvl", xRightColumn + 146, 30, 50, 25);
    currentComponentIds.push(labelId);
    
    for (var i = 1; i <= numSkills; i++) {
        // Labels pour les compétences
        var col = i <= 9 ? 0 : 1; // Colonne 0 (gauche) pour les compétences de 1 à 9, Colonne 1 (droite) pour les compétences de 10 à 18
        var row = i <= 9 ? i : i - 9; // Ligne de 1 à 9 dans la colonne de gauche, de 1 à 9 dans la colonne de droite

        // Position en x en fonction de la colonne
        var xPos = col === 0 ? xLeftColumn : xRightColumn;

        //Label des skills
        labelId = gui.addLabel(i * 4 - 3, "- " + skills_liste[i-1], xPos, 50 + (row - 1) * 25, 150, 25);
        currentComponentIds.push(labelId);
        
        // Affichage du niveau de compétence
        labelId = gui.addLabel(i * 4 - 2, skillLevels[i - 1].toString(), xPos + 150, 50 + (row - 1) * 25, 50, 25);
        currentComponentIds.push(labelId);
        
        // Boutons +
        labelId = gui.addButton(i * 4 - 1, "+", xPos + 165, 50 + (row - 1) * 25, 20, 20);
        currentComponentIds.push(labelId);
        
        // Boutons -
        labelId = gui.addButton(i * 4, "-", xPos + 190, 50 + (row - 1) * 25, 20, 20);
        currentComponentIds.push(labelId);
        
        UpskillButtonMap[i] = i * 4 - 1;
        DownskillButtonMap[i] = i * 4;
    }
}

// Fonction pour afficher les compétences actives
function displayActiveSkills() {
    clearCurrentComponents();
    

    // Ajoutez le sommaire persistant
    labelId = gui.addButton(910, "DEFENCE", 0, -20, 80, 20);currentComponentIds.push(labelId);
    labelId = gui.addButton(911, "MOBILITE", 90, -20, 80, 20);currentComponentIds.push(labelId);
    labelId = gui.addButton(912, "ATTAQUE", 180, -20, 80, 20);currentComponentIds.push(labelId);


    // Si un domaine est sélectionné, affichez les sous-domaines associés
    if (currentDomain === "DEFENCE") {
        labelId = gui.addButton(920, "Lumière", 0, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(921, "Terre", 67, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(922, "Electrique", 133, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(923, "Feu", 200, 10, 60, 20);currentComponentIds.push(labelId);
    } else if (currentDomain === "MOBILITE") {
        labelId = gui.addButton(930, "Vent", 67, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(931, "Vide", 133, 10, 60, 20);currentComponentIds.push(labelId);
    } else if (currentDomain === "ATTAQUE") {
        labelId = gui.addButton(940, "Vide",0, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(941, "Sang", 67, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(942, "Vent", 133, 10, 60, 20);currentComponentIds.push(labelId);
        labelId = gui.addButton(943, "Feu", 200, 10, 60, 20);currentComponentIds.push(labelId);
    }

    labelId = gui.addLabel(999, "Compétences de " + currentDomain+" : "+currentSubdomain, 50, 35, 3000, 20);currentComponentIds.push(labelId);
    
    labelId = gui.addLabel(998, "Lvl", 157, 50, 30, 20);currentComponentIds.push(labelId);
    
    
    
if (currentDomain in skills) {
    if (currentSubdomain in skills[currentDomain]) {
        var yPos = 70; // Position de départ pour les compétences
        var currentSkills = skills[currentDomain][currentSubdomain];
        
        for (var i = 0; i < currentSkills.length; i++) {
            var skill = currentSkills[i];
            
            labelId = gui.addButton(skill.id, "-", 20+190, yPos, 20, 20);currentComponentIds.push(labelId);
            labelId = gui.addButton(skill.id + 10, "+", 20+165, yPos, 20, 20);currentComponentIds.push(labelId);
            labelId = gui.addLabel(skill.id + 20, "- " + skill.name, 20+0, yPos, 140, 20);currentComponentIds.push(labelId);
            labelId = gui.addLabel(skill.id + 30, "0", 162, yPos, 20, 20);currentComponentIds.push(labelId);
            
            yPos += 25;
        }
    }
}

    

}


function edit_player_skills(e,player){  
    var player_name = player.getName()
    
    var toutesLesCompétencesSontNulles = skillLevels.every(function (niveau) {
        return niveau === 0;
    });
    
    if (toutesLesCompétencesSontNulles) {
        //player.message("stop function")
        return false; // Aucune compétence attribuée, ne continuez pas
    }
    
    // Tableau de référence des compétences et de leurs identifiants dans le jeu
    var compétencesAttribuées = [
        {jeuId: "explosion_resistance", multiply:1.5},
        {jeuId: "damage_resistance", multiply:1},
        {jeuId: "knockback_resistance", multiply:1},
        {jeuId: "magic_resistance",multiply:1 },
        {jeuId: "heart_boost",multiply:1},
        {jeuId: "fire_resistance",multiply:1 },
        //
        {jeuId: "jump_height",multiply:1 },
        {jeuId: "speed" ,multiply:1},
        {jeuId: "fall_resistance" ,multiply:1},
        {jeuId: "endurance" ,multiply:1},
        {jeuId: "stealth_damage" ,multiply:1},
        {jeuId: "swim_speed" ,multiply:1},
        //
        {jeuId: "damage" ,multiply:1},
        {jeuId: "attack_speed" ,multiply:1},
        {jeuId: "knockback" ,multiply:1},
        {jeuId: "ability_power" ,multiply:1},
        {jeuId: "critical_chance" ,multiply:1},
        {jeuId: "armor_penetration" ,multiply:1},
    ];

    e.API.executeCommand(e.API.getIWorld(player.getWorld().getDimension().getId()),"enderskills_skill "+player_name+" reset")
    
    // Boucle pour exécuter les commandes pour chaque compétence attribuée
    for (var i = 0; i < compétencesAttribuées.length; i++) {
        var compétence = compétencesAttribuées[i];
        var niveau = skillLevels[i];

        if (niveau > 0) {
            var idCompétenceJeu = compétence.jeuId; // ID de la compétence dans le jeu
            var pointsAttribués = niveau-1; // Nombre de points attribués
            var multi = compétence.multiply
            
            var lvl_skill = (pointsAttribués*multi).toFixed()
            
            e.API.executeCommand(e.API.getIWorld(player.getWorld().getDimension().getId()),"enderskills_skill "+player_name+" enderskills:"+idCompétenceJeu+" unlock")
            e.API.executeCommand(e.API.getIWorld(player.getWorld().getDimension().getId()),"enderskills_skill "+player_name+" enderskills:"+idCompétenceJeu+" set "+lvl_skill)
        }
    }

    return true; // Des compétences ont été attribuées
    
    
}


function clearCurrentComponents() {
    for (var i = 0; i < currentComponentIds.length; i++) {
        gui.removeComponent(currentComponentIds[i].getID());
    }
    currentComponentIds = []; // Réinitialisez la liste après avoir supprimé tous les composants
}


function import_player_skill(e,player){
var player_name = player.getName()

// Récupérez la chaîne JSON de votre variable globale
var jsonString = e.API.getIWorld(0).getStoreddata().get("players_skills_info");

    // Vérifiez si la chaîne JSON existe
    if (jsonString === null) {
        // Si la chaîne JSON n'existe pas, créez un nouvel objet vide
        var playerInfo = {};
    } else {
        // Désérialisez la chaîne JSON en un objet JavaScript
        var playerInfo = JSON.parse(jsonString);
    }

    // Vérifiez si le joueur a déjà des données dans l'objet
    if (!playerInfo[player_name]) {
        //player.message("Le joueur '" + player_name + "' n'a pas encore de données.");
        create_stats(e,player)
        
        jsonString = e.API.getIWorld(0).getStoreddata().get("players_skills_info");
        playerInfo = JSON.parse(jsonString);
    }


// Désérialisez la chaîne JSON en un objet JavaScript
var playerInfo = JSON.parse(jsonString);

// Récupérez les informations pour le joueur
var pointsRestantsPlayer = playerInfo[player_name].pointsRestants;
var skill1PointsPlayer = playerInfo[player_name].pointsUtilises.skill1;
var skill2PointsPlayer = playerInfo[player_name].pointsUtilises.skill2;
var skill3PointsPlayer = playerInfo[player_name].pointsUtilises.skill3;
var skill4PointsPlayer = playerInfo[player_name].pointsUtilises.skill4;
var skill5PointsPlayer = playerInfo[player_name].pointsUtilises.skill5;
var skill6PointsPlayer = playerInfo[player_name].pointsUtilises.skill6;
var skill7PointsPlayer = playerInfo[player_name].pointsUtilises.skill7;
var skill8PointsPlayer = playerInfo[player_name].pointsUtilises.skill8;
var skill9PointsPlayer = playerInfo[player_name].pointsUtilises.skill9;
var skill10PointsPlayer = playerInfo[player_name].pointsUtilises.skill10;
var skill11PointsPlayer = playerInfo[player_name].pointsUtilises.skill11;
var skill12PointsPlayer = playerInfo[player_name].pointsUtilises.skill12;
var skill13PointsPlayer = playerInfo[player_name].pointsUtilises.skill13;
var skill14PointsPlayer = playerInfo[player_name].pointsUtilises.skill14;
var skill15PointsPlayer = playerInfo[player_name].pointsUtilises.skill15;
var skill16PointsPlayer = playerInfo[player_name].pointsUtilises.skill16;
var skill17PointsPlayer = playerInfo[player_name].pointsUtilises.skill17;
var skill18PointsPlayer = playerInfo[player_name].pointsUtilises.skill18;

skillLevels = [skill1PointsPlayer,skill2PointsPlayer,skill3PointsPlayer,skill4PointsPlayer,skill5PointsPlayer,skill6PointsPlayer,skill7PointsPlayer,skill8PointsPlayer,skill9PointsPlayer,skill10PointsPlayer,skill11PointsPlayer,skill12PointsPlayer,skill13PointsPlayer,skill14PointsPlayer,skill15PointsPlayer,skill16PointsPlayer,skill17PointsPlayer,skill18PointsPlayer]
player_skill_point = pointsRestantsPlayer

}


function edit_player_stats(e,player){
    var player_name = player.getName();

    // Récupérez la chaîne JSON de votre variable globale
    var jsonString = e.API.getIWorld(0).getStoreddata().get("players_skills_info");

    // Vérifiez si la chaîne JSON existe
    if (jsonString === null) {
        player.message("La variable globale 'players_skills_info' n'existe pas encore.");
        return;
    }

    // Désérialisez la chaîne JSON en un objet JavaScript
    var playerInfo = JSON.parse(jsonString);

    // Vérifiez si le joueur a déjà des données dans l'objet
    if (!playerInfo[player_name]) {
        player.message("Le joueur '" + player_name + "' n'a pas encore de données.");
        return;
    }

    // Modifiez les valeurs du joueur
    playerInfo[player_name].pointsRestants = player_skill_point; // Modifiez la valeur des points restants
    playerInfo[player_name].pointsUtilises.skill1 = skillLevels[0]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill2 = skillLevels[1]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill3 = skillLevels[2]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill4 = skillLevels[3]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill5 = skillLevels[4]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill6 = skillLevels[5]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill7 = skillLevels[6]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill8 = skillLevels[7]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill9 = skillLevels[8]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill10 = skillLevels[9]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill11 = skillLevels[10]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill12 = skillLevels[11]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill13 = skillLevels[12]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill14 = skillLevels[13]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill15 = skillLevels[14]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill16 = skillLevels[15]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill17 = skillLevels[16]; // Modifiez la valeur du skill1
    playerInfo[player_name].pointsUtilises.skill18 = skillLevels[17]; // Modifiez la valeur du skill1

    // Sérialisez à nouveau l'objet en une chaîne JSON
    var newJsonString = JSON.stringify(playerInfo);

    // Stockez la nouvelle chaîne JSON dans votre variable globale
    e.API.getIWorld(0).getStoreddata().put("players_skills_info", newJsonString);
}




function create_stats(e,player) {
    var player_name = player.getName();

    // Récupérez la chaîne JSON de votre variable globale
    var jsonString = e.API.getIWorld(0).getStoreddata().get("players_skills_info");

    // Vérifiez si la chaîne JSON existe
    if (jsonString === null) {
        // Si la chaîne JSON n'existe pas, créez un nouvel objet vide
        var playerInfo = {};
    } else {
        // Désérialisez la chaîne JSON en un objet JavaScript
        var playerInfo = JSON.parse(jsonString);
    }

    // Vérifiez si le joueur a déjà des données dans l'objet
    if (!playerInfo[player_name]) {
        // Si le joueur n'a pas encore de données, créez un nouvel objet pour lui
        playerInfo[player_name] = {
            "pointsRestants": 2,
            "pointsUtilises": {
                "skill1": 0,
                "skill2": 0,
                "skill3": 0,
                "skill4": 0,
                "skill5": 0,
                "skill6": 0,
                "skill7": 0,
                "skill8": 0,
                "skill9": 0,
                "skill10": 0,
                "skill11": 0,
                "skill12": 0,
                "skill13": 0,
                "skill14": 0,
                "skill15": 0,
                "skill16": 0,
                "skill17": 0,
                "skill18": 0
            }
        }
        
        // Sérialisez à nouveau l'objet en une chaîne JSON
        var newJsonString = JSON.stringify(playerInfo);

        // Stockez la nouvelle chaîne JSON dans votre variable globale
        e.API.getIWorld(0).getStoreddata().put("players_skills_info", newJsonString);

        
    }else{
        player.message("le joueur a deja des skills d'enregistrer dans le data")
    }


}


