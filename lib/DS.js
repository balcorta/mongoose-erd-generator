const underlineText = str => `<u> ${str} </u>`
const boldText=str=>`<b> ${str} </b>`;

const getTextColor = (bgColor) => {
  const lightColor = '#FFFFFF';
  const darkColor = '#000000';
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}
export  class ERD {
  constructor(name) {
    this.name = name;
    this.nodes = [];
    this.relations=[];
  }
  addRelation(collection1,collection2,collection1Config){

   const tailLabel='1';
   const headLabel='N'
   this.relations.push(`${collection2}:${collection1Config.foreignField} -> ${collection1}:${collection1Config.localField.index}  [label="${collection2}-${collection1}" arrowhead=none shape="none" headlabel="${headLabel}" taillabel = "${tailLabel}"]`)
  }
  addCollection(node) {
    this.nodes.push(node);
  }
  generate() {

      return `
        digraph {
        splines=true; esep=1;
        graph [margin="0" pad="2", nodesep="1", ranksep="1"  overlap=false, splines=true];
        node [shape=record, fontsize=9]
        edge [style=dashed];
        rankdir=LR;
        ${this.nodes.map(node=>node.generate()).join('\n')}

        ${this.relations.join('\n')}
        }
        `


  }
}

export  class Collection {

  constructor(name,options) {
    this.name = name;
    this.fields = [];
    this.options=options;
  }

  addField(name, options) {
    this.fields.push({
      name,
      options
    })
  }
  

  
  generate() {
    const fieldsString = [];

    for (const field of this.fields) {
      let nameString = field.name;
      let options=field.options;
      let fieldString=nameString;
      if(options.type){
        fieldString+=' ['+options.type+']';
      }
      fieldsString.push(fieldString);
    }
    return `

  ${this.name} [shape="none" margin=0 label=<<table BGCOLOR="${this.options.backgroundColor}" border="0" cellborder="1" cellspacing="0" cellpadding="4">
  <tr><td  bgcolor="${this.options.nameColor}" align="center" cellpadding="3"><font color="${getTextColor(this.options.nameColor)}">${boldText(this.name)}</font></td></tr>
      ${this.fields.map((field,i)=>'<tr><td port='+'"'+i+'"'+' align="left"><font color="'+getTextColor(this.options.backgroundColor)+'">'+field.name+': '+field.options.type+'</font></td></tr>').join('\n\t')}

  </table>>]
  `
  }



}


