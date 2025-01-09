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
      text: 'Effect Magnitude vs Pump Polarization'
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
var layoutx = {
    title: {
      text: 'Effect X Magnitude vs Pump Polarization'
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
var layouty = {
    title: {
      text: 'Effect Y Magnitude vs Pump Polarization'
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
var layoutz = {
    title: {
      text: 'Effect Z Magnitude vs Pump Polarization'
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

var tracemag = {
    r: [0],
    theta: getRange(0,360,1),
    mode: 'lines',
    line: {color: 'orange'},
    type: 'scatterpolar',
};
var tracex = {
    r: [0],
    theta: getRange(0,360,1),
    mode: 'lines',
    line: {color: 'red'},
    type: 'scatterpolar',
};
var tracey = {
    r: [0],
    theta: getRange(0,360,1),
    mode: 'lines',
    line: {color: 'green'},
    type: 'scatterpolar',
};

var tracez = {
    r: [0],
    theta: getRange(0,360,1),
    mode: 'lines',
    line: {color: 'blue'},
    type: 'scatterpolar',
};

function genTensor(){
    let pgroup=document.getElementById("ptgroup").value;
    let prop=document.getElementById("prop").value;
    let orTable=document.getElementById("ORtensor");
    let forbid=document.getElementById("forbid");
    let rows=document.getElementsByClassName("datarow");
    let heading=document.getElementById("toprow");
    let dims=["x","y","z"];
    let dims2=["xx","yy","zz","yz","xz","xy"];
    if (prop=="OR" || prop=="SHG"){
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
            //changing the text for SHG vs OR
            let xstr="X(0;w,-w)<sub>";
            if (prop=="SHG"){
                xstr="X(2w;w,-w)<sub>";
            }
            //populating the tensors
            for(let j=0; j<3;j++){
                if (prop=="OR"){
                    rows[j].children[0].innerHTML="P<sub>"+dims[j]+"</sub>";
                }
                else{
                    rows[j].children[0].innerHTML="P(2w)<sub>"+dims[j]+"</sub>";
                }
                rows[j].children[0].style.display="table-cell";
                for (let i=0; i<6; i++){
                    rows[j].children[i+1].style.display="table-cell";
                    if (ORtensors[index][j][i]==0){
                        rows[j].children[i+1].innerHTML=0;
                    }
                    else if (used.includes(ORtensors[index][j][i])){
                        let posindex=used.indexOf(ORtensors[index][j][i]);
                        rows[j].children[i+1].innerHTML=xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                    }
                    else if (used.includes(-1*ORtensors[index][j][i])){
                        let posindex=used.indexOf(-1*ORtensors[index][j][i]);
                        rows[j].children[i+1].innerHTML="-"+xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                    }
                    else{
                        rows[j].children[i+1].innerHTML=xstr+String(j+1)+String(i+1)+"</sub>";
                        used.push(ORtensors[index][j][i]);
                        position.push([j+1,i+1]);
                    }
                }
            }
            //Hiding the unused rows for these tensors
            for(let j=3;j<6;j++){
                rows[j].style.display="none";
            }
            for(let i=4;i<7;i++){
                heading.children[i].style.display="table-cell";
            }

            document.getElementById("hex").innerHTML="E<sub>x</sub><sup>2</sup>";
            document.getElementById("hey").innerHTML="E<sub>y</sub><sup>2</sup>";
            document.getElementById("hez").innerHTML="E<sub>z</sub><sup>2</sup>";

            let innerhtmlxparams=""
            for (let i=0; i<position.length; i++){
                innerhtmlxparams+="<div class=\"xparam\"><p>"+xstr+String(position[i][0])+String(position[i][1])+"</sub></p><input onchange=\"pCalc()\" type=\"text\" value=0 id=\"x"+String(i)+"\"></div>";
            }
            document.getElementById("XParams").innerHTML=innerhtmlxparams;

            //Setting up the polarization output
            let out=document.getElementById("pols");
            for(let i=0;i<3;i++){
                out.children[i].innerHTML="P<sub>"+dims[i]+"</sub>=<div id='P"+dims[i]+"' style='display: inline;'>0</div>";
            }
            for(let i=3;i<6;i++){
                out.children[i].style.display="none";
            }
        }
    }
    else if (prop=="Pockels"){//for the Pockels effect
        if (pockforbidden.includes(pgroup)){
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
            index=pockallowed.indexOf(pgroup);
            let used=[];
            position=[];
            //changing the text for SHG vs OR
            let xstr="z<sub>";
            //populating the tensors
            for(let j=0; j<6;j++){
                rows[j].children[0].innerHTML="B<sub>"+dims2[j]+"</sub>";
                rows[j].style.display="table-row";
                rows[j].children[0].style.display="table-cell";
                for (let i=0; i<3; i++){
                    rows[j].children[i+1].style.display="table-cell";
                    if (pocktensors[index][j][i]==0){
                        rows[j].children[i+1].innerHTML=0;
                    }
                    else if (used.includes(pocktensors[index][j][i])){
                        let posindex=used.indexOf(pocktensors[index][j][i]);
                        rows[j].children[i+1].innerHTML=xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                    }
                    else if (used.includes(-1*pocktensors[index][j][i])){
                        let posindex=used.indexOf(-1*pocktensors[index][j][i]);
                        rows[j].children[i+1].innerHTML="-"+xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                    }
                    else{
                        rows[j].children[i+1].innerHTML=xstr+String(j+1)+String(i+1)+"</sub>";
                        used.push(pocktensors[index][j][i]);
                        position.push([j+1,i+1]);
                    }
                }
            }
            //Hiding the unused rows for these tensors
            for(let j=0;j<6;j++){
                for(let i=3; i<6;i++){
                    rows[j].children[i+1].style.display="none";
                }
            }
            for(let i=4;i<7;i++){
                heading.children[i].style.display="none";
            }

            document.getElementById("hex").innerHTML="E<sub>x</sub>";
            document.getElementById("hey").innerHTML="E<sub>y</sub>";
            document.getElementById("hez").innerHTML="E<sub>z</sub>";

            let innerhtmlxparams=""
            for (let i=0; i<position.length; i++){
                innerhtmlxparams+="<div class=\"xparam\"><p>"+xstr+String(position[i][0])+String(position[i][1])+"</sub></p><input onchange=\"pCalc()\" type=\"text\" value=0 id=\"x"+String(i)+"\"></div>";
            }
            document.getElementById("XParams").innerHTML=innerhtmlxparams;

            //Setting up the B change output
            let out=document.getElementById("pols");
            for(let i=0;i<6;i++){
                out.children[i].style.display="inline";
                out.children[i].innerHTML="B<sub>"+dims2[i]+"</sub>=<div id='P"+dims2[i]+"' style='display: inline;'>0</div>";
            }
        }
    }
    else if (prop=="Kerr"){//for the Kerr effect
        if(!allowed){
            orTable.style.display = "block";
            forbid.style.display = "none";
            allowed=true;
        }
        index=pointGroups.indexOf(pgroup);
        let used=[];
        position=[];
        //changing the text for SHG vs OR
        let xstr="R<sub>";
        //populating the tensors
        for(let j=0; j<6;j++){
            rows[j].children[0].innerHTML="B<sub>"+dims2[j]+"</sub>";
            rows[j].style.display="table-row";
            rows[j].children[0].style.display="table-cell";
            for (let i=0; i<6; i++){
                rows[j].children[i+1].style.display="table-cell";
                if (kerrtensors[index][j][i]==0){
                    rows[j].children[i+1].innerHTML=0;
                }
                else if (kerrtensors[index][j][i]==37){
                    rows[j].children[i+1].innerHTML="1/2R<sub>11</sub> - 1/2R<sub>12</sub>";
                }
                else if (used.includes(kerrtensors[index][j][i])){
                    let posindex=used.indexOf(kerrtensors[index][j][i]);
                    rows[j].children[i+1].innerHTML=xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                }
                else if (used.includes(-1*kerrtensors[index][j][i])){
                    let posindex=used.indexOf(-1*kerrtensors[index][j][i]);
                    rows[j].children[i+1].innerHTML="-"+xstr+String(position[posindex][0])+String(position[posindex][1])+"</sub>";
                }
                else{
                    rows[j].children[i+1].innerHTML=xstr+String(j+1)+String(i+1)+"</sub>";
                    used.push(kerrtensors[index][j][i]);
                    position.push([j+1,i+1]);
                }
            }
        }
        //Making to show the full heading
        for(let i=4;i<7;i++){
            heading.children[i].style.display="table-cell";
        }

        document.getElementById("hex").innerHTML="E<sub>x</sub><sup>2</sup>";
        document.getElementById("hey").innerHTML="E<sub>y</sub><sup>2</sup>";
        document.getElementById("hez").innerHTML="E<sub>z</sub><sup>2</sup>";

        let innerhtmlxparams=""
        for (let i=0; i<position.length; i++){
            innerhtmlxparams+="<div class=\"xparam\"><p>"+xstr+String(position[i][0])+String(position[i][1])+"</sub></p><input onchange=\"pCalc()\" type=\"text\" value=0 id=\"x"+String(i)+"\"></div>";
        }
        document.getElementById("XParams").innerHTML=innerhtmlxparams;

        //Setting up the B change output
        let out=document.getElementById("pols");
        for(let i=0;i<6;i++){
            out.children[i].style.display="inline";
            out.children[i].innerHTML="B<sub>"+dims2[i]+"</sub>=<div id='P"+dims2[i]+"' style='display: inline;'>0</div>";
        }
    }
    pCalc();   
}

function EMcalc(){
    let gAngle=document.getElementById("geoAngle").value*(Math.PI/180);
    let pAngle=document.getElementById("polAngle").value*(Math.PI/180);
    let mag=document.getElementById("magnitude").value;
    E=[mag*(Math.cos(gAngle)*-Math.sin(pAngle)),mag*(Math.cos(pAngle)),mag*(Math.sin(gAngle)*-Math.sin(pAngle))];
    document.getElementById("Ex").innerHTML=Math.round(E[0]*10000)/10000.0;
    document.getElementById("Ey").innerHTML=Math.round(E[1]*10000)/10000.0;
    document.getElementById("Ez").innerHTML=Math.round(E[2]*10000)/10000.0;
}

function EMcalcAngle(pAngleRad){//ARGUMENT IS IN DEGREES!
    let pAngle=pAngleRad*Math.PI/180;
    let gAngle=document.getElementById("geoAngle").value*(Math.PI/180);
    let mag=document.getElementById("magnitude").value;
    eField=[mag*(Math.cos(gAngle)*-Math.sin(pAngle)),mag*Math.cos(pAngle),mag*(Math.sin(gAngle)*-Math.sin(pAngle))];
    return eField;
}

function pCalc(){
    EMcalc();
    let prop=document.getElementById("prop").value;
    let pAngle=document.getElementById("polAngle").value;
    if (prop=="OR"||prop=="SHG"){
        let polarization=pCalcAngleOR(pAngle);
        for(let i=0; i<3; i++){
            polarization[i]=Math.round(polarization[i]*10000)/10000.0;
        }
        document.getElementById("Px").innerHTML=polarization[0];
        document.getElementById("Py").innerHTML=polarization[1];
        document.getElementById("Pz").innerHTML=polarization[2];
    }
    else if(prop=="Pockels"){
        let pock=pCalcAnglePock(pAngle);
        for(let i=0; i<6; i++){
            pock[i]=Math.round(pock[i]*10000)/10000.0;
        }
        document.getElementById("Pxx").innerHTML=pock[0];
        document.getElementById("Pyy").innerHTML=pock[1];
        document.getElementById("Pzz").innerHTML=pock[2];
        document.getElementById("Pyz").innerHTML=pock[3];
        document.getElementById("Pxz").innerHTML=pock[4];
        document.getElementById("Pxy").innerHTML=pock[5];
    }
    else if(prop=="Kerr"){
        let k=pCalcAngleKerr(pAngle);
        for(let i=0; i<6; i++){
            k[i]=Math.round(k[i]*10000)/10000.0;
        }
        document.getElementById("Pxx").innerHTML=k[0];
        document.getElementById("Pyy").innerHTML=k[1];
        document.getElementById("Pzz").innerHTML=k[2];
        document.getElementById("Pyz").innerHTML=k[3];
        document.getElementById("Pxz").innerHTML=k[4];
        document.getElementById("Pxy").innerHTML=k[5];
    }

    if (prop=="OR" || prop=="SHG"){
        let polmags=[];
        let polx=[];
        let poly=[];
        let polz=[];
        for (let i=0; i<360; i++){
            let p=pCalcAngleOR(i);
            polmags.push(Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]));
            polx.push(p[0]);
            poly.push(p[1]);
            polz.push(p[2]);
        }
        tracemag.r=polmags;
        tracex.r=polx;
        tracey.r=poly;
        tracez.r=polz;
    }
    else if (prop=="Pockels"){
        let polmags=[];
        for (let i=0; i<360; i++){
            let p=pCalcAnglePock(i);
            polmags.push(Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]+p[3]*p[3]+p[4]*p[4]+p[5]*p[5]));
        }
        tracemag.r=polmags;
    }
    else if (prop=="Kerr"){
        let polmags=[];
        for (let i=0; i<360; i++){
            let p=pCalcAngleKerr(i);
            polmags.push(Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]+p[3]*p[3]+p[4]*p[4]+p[5]*p[5]));
        }
        tracemag.r=polmags;
    }

    if (prop=="OR"){
        layout.title.text="OR Magnitude vs Pump Polarization";
        layoutx.title.text="OR X Magnitude vs Pump Polarization";
        layouty.title.text="OR Y Magnitude vs Pump Polarization";
        layoutz.title.text="OR Z Magnitude vs Pump Polarization";
        document.getElementById("polarPlotx").style.display="block";
        document.getElementById("polarPloty").style.display="block";
        document.getElementById("polarPlotz").style.display="block";
    }
    else if (prop=="SHG"){
        layout.title.text="SHG Magnitude vs Pump Polarization";
        layoutx.title.text="SHG X Magnitude vs Pump Polarization";
        layouty.title.text="SHG Y Magnitude vs Pump Polarization";
        layoutz.title.text="SHG Z Magnitude vs Pump Polarization";
        document.getElementById("polarPlotx").style.display="block";
        document.getElementById("polarPloty").style.display="block";
        document.getElementById("polarPlotz").style.display="block";
    }
    else if (prop=="Pockels"){
        layout.title.text="Pockels Effect Magnitude vs Pump Polarization";
        document.getElementById("polarPlotx").style.display="none";
        document.getElementById("polarPloty").style.display="none";
        document.getElementById("polarPlotz").style.display="none";
    }
    else if (prop=="Kerr"){
        layout.title.text="Kerr Effect Magnitude vs Pump Polarization";
        document.getElementById("polarPlotx").style.display="none";
        document.getElementById("polarPloty").style.display="none";
        document.getElementById("polarPlotz").style.display="none";
    }

    Plotly.newPlot('polarPlot', [tracemag], layout);
    Plotly.newPlot('polarPlotx', [tracex], layoutx);
    Plotly.newPlot('polarPloty', [tracey], layouty);
    Plotly.newPlot('polarPlotz', [tracez], layoutz);
}

function pCalcAngleOR(pAngle){
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
                    p[i]+=coef*Ef[0]*Ef[0]
                }
                else if (j==1){
                    p[i]+=coef*Ef[1]*Ef[1]
                }
                else if (j==2){
                    p[i]+=coef*Ef[2]*Ef[2]
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

function pCalcAnglePock(pAngle){
    let Ef=EMcalcAngle(pAngle);
    let p=[0,0,0,0,0,0];
    for(let i=0; i<pocktensors[index].length;i++){
        for(let j=0; j<pocktensors[index][i].length; j++){
            if (pocktensors[index][i][j]!=0){
                let pos=Math.abs(pocktensors[index][i][j])-1;
                let coef=document.getElementById("x"+String(pos)).value;
                if(pocktensors[index][i][j]<0){
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
            }
        }
    }
    return p;
}

function pCalcAngleKerr(pAngle){
    let Ef=EMcalcAngle(pAngle);
    let p=[0,0,0,0,0,0];
    for(let i=0; i<kerrtensors[index].length;i++){
        for(let j=0; j<kerrtensors[index][i].length; j++){
            if (kerrtensors[index][i][j]==37){
                let coef1=document.getElementById("x0").value;
                let coef2=document.getElementById("x1").value;
                p[i]+=(0.5*coef1-0.5*coef2)*Ef[0]*Ef[1];
            }
            else if (kerrtensors[index][i][j]!=0){
                let pos=Math.abs(kerrtensors[index][i][j])-1;
                let coef=document.getElementById("x"+String(pos)).value;
                if(kerrtensors[index][i][j]<0){
                    coef=coef*-1;
                }
                if (j==0){
                    p[i]+=coef*Ef[0]*Ef[0]
                }
                else if (j==1){
                    p[i]+=coef*Ef[1]*Ef[1]
                }
                else if (j==2){
                    p[i]+=coef*Ef[2]*Ef[2]
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
