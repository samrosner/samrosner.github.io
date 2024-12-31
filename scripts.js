var allowed=true;
var index=0;
var position=[];
var E=[0,0,0]

function getRange(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
  
var layout = {
    title: {
      text: 'OR Magnitude vs Pump Polarization'
    },
    font: {
      family: 'Arial, sans-serif;',
      size: 12,
      color: '#000'
    },
    showlegend: false,
    orientation: -90,
    autosize: true
};

var trace1 = {
    r: [0],
    theta: getRange(0,360,1),
    mode: 'lines',
    line: {color: 'orange'},
    type: 'scatterpolar'
};

function genTensor(){
    let pgroup=document.getElementById("ptgroup").value;
    let orTable=document.getElementById("ORtensor");
    let forbid=document.getElementById("forbid");
    let r1 = document.getElementById('r1');
    let r2 = document.getElementById('r2');
    let r3 = document.getElementById('r3');
    if (ORforbidden.includes(pgroup)){
        allowed=false;
        orTable.style.display = "none";
        forbid.style.display = "block";
        document.getElementById("XParams").innerHTML="";
        position=[];
    }
    else{
        if(!allowed){
            orTable.style.display = "block";
            forbid.style.display = "none";
            allowed=true;
        }
        index=ORallowed.indexOf(pgroup);
        let used=[];
        position=[];
        for (let i=0; i<6; i++){
            if (ORtensors[index][0][i]==0){
                r1.children[i+1].innerHTML=0;
            }
            else if (used.includes(ORtensors[index][0][i])){
                let posindex=used.indexOf(ORtensors[index][0][i]);
                r1.children[i+1].innerHTML="X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else if (used.includes(-1*ORtensors[index][0][i])){
                let posindex=used.indexOf(-1*ORtensors[index][0][i]);
                r1.children[i+1].innerHTML="-X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else{
                r1.children[i+1].innerHTML="X(0;w,-w)<sub>1"+String(i+1)+"</sub>";
                used.push(ORtensors[index][0][i]);
                position.push([1,i+1]);
            }
        }
        for (let i=0; i<6; i++){
            if (ORtensors[index][1][i]==0){
                r2.children[i+1].innerHTML=0;
            }
            else if (used.includes(ORtensors[index][1][i])){
                let posindex=used.indexOf(ORtensors[index][1][i]);
                r2.children[i+1].innerHTML="X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else if (used.includes(-1*ORtensors[index][1][i])){
                let posindex=used.indexOf(-1*ORtensors[index][1][i]);
                r2.children[i+1].innerHTML="-X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else{
                r2.children[i+1].innerHTML="X(0;w,-w)<sub>2"+String(i+1)+"</sub>";
                used.push(ORtensors[index][1][i]);
                position.push([2,i+1]);
            }
        }
        for (let i=0; i<6; i++){
            if (ORtensors[index][2][i]==0){
                r3.children[i+1].innerHTML=0;
            }
            else if (used.includes(ORtensors[index][2][i])){
                let posindex=used.indexOf(ORtensors[index][2][i]);
                r3.children[i+1].innerHTML="X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else if (used.includes(-1*ORtensors[index][2][i])){
                let posindex=used.indexOf(-1*ORtensors[index][2][i]);
                r3.children[i+1].innerHTML="-X(0;w,-w)<sub>"+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
            }
            else{
                r3.children[i+1].innerHTML="X(0;w,-w)<sub>3"+String(i+1)+"</sub>";
                used.push(ORtensors[index][2][i]);
                position.push([3,i+1]);
            }
        }
        let innerhtmlxparams=""
        for (let i=0; i<position.length; i++){
            innerhtmlxparams+="<div class=\"xparam\"><p>X(0,w,-w)<sub>"+String(position[i][0])+String(position[i][1])+"</sub></p><input onchange=\"pCalc()\" type=\"text\" value=0 id=\"x"+String(i)+"\"></div>";
        }
        document.getElementById("XParams").innerHTML=innerhtmlxparams;
    }   
}

function EMcalc(){
    let gAngle=document.getElementById("geoAngle").value*(Math.PI/180);
    let pAngle=document.getElementById("polAngle").value*(Math.PI/180);
    let mag=document.getElementById("magnitude").value;
    E=[mag*(Math.cos(gAngle)*-Math.sin(pAngle)),mag*(Math.cos(pAngle)),mag*(Math.sin(gAngle)*-Math.sin(pAngle))];
    if (Math.abs(E[0])<0.00001) E[0]=0;
    if (Math.abs(E[1])<0.00001) E[1]=0;
    if (Math.abs(E[2])<0.00001) E[2]=0;
    document.getElementById("Ex").innerHTML=E[0];
    document.getElementById("Ey").innerHTML=E[1];
    document.getElementById("Ez").innerHTML=E[2];
}

function EMcalcAngle(pAngleRad){
    let pAngle=pAngleRad*Math.PI/180;
    let gAngle=document.getElementById("geoAngle").value*(Math.PI/180);
    let mag=document.getElementById("magnitude").value;
    eField=[mag*(Math.cos(gAngle)*-Math.sin(pAngle)),mag*Math.cos(pAngle),mag*(Math.sin(gAngle)*-Math.sin(pAngle))];
    return eField;
}

function pCalc(){
    EMcalc();
    let pAngle=document.getElementById("polAngle").value*(Math.PI/180);
    var polarization=pCalcAngle(pAngle);
    document.getElementById("Px").innerHTML=polarization[0];
    document.getElementById("Py").innerHTML=polarization[1];
    document.getElementById("Pz").innerHTML=polarization[2];

    let polmags=[];
    for (let i=0; i<360; i++){
        let p=pCalcAngle(i);
        polmags.push(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]);
    }
    trace1.r=polmags;

    Plotly.newPlot('polarPlot', [trace1], layout);
}

function pCalcAngle(pAngle){
    let Ef=EMcalcAngle(pAngle);
    let p=[0,0,0];
    for(let i=0; i<ORtensors[index].length;i++){
        for(let j=0; j<ORtensors[index][i].length; j++){
            if (ORtensors[index][i][j]!=0){
                let pos=Math.abs(ORtensors[index][i][j])-1;
                let coef=document.getElementById("x"+String(pos)).value;
                if(ORtensors[index][i][j]<0){
                    coef=coef*-1;
                }
                if (j==0){
                    p[i]+=coef*Ef[0]
                }
                else if (j==1){
                    p[i]+=coef*Ef[1]
                }
                else if (j==2){
                    p[i]+=coef*Ef[2]
                }
                else if (j==3){
                    p[i]+=coef*Ef[1]*Ef[2]
                }
                else if (j==4){
                    p[i]+=coef*Ef[0]*Ef[2]
                }
                else if (j==5){
                    p[i]+=coef*Ef[0]*Ef[1]
                }
            }
        }
    }
    return p;
}
