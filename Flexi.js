import React from 'react';

function recurseData(o,d){
  let target, childName, newData;
  let x;
  for(x in d){
    if(!x.includes('.')){
      target = o.filter(v => v.name === x)[0];
      target.value = d[x];
    } else {
      childName = x.split('.')[0];
      target = o.filter(v => v.name === childName)[0];
      childName = x.split('.');
      childName.shift();
      childName = childName.join('.');
      childName = {
        [childName]: d[x]
      };
      recurseData(target.children.items, childName);
    }
  }
}

class Flexi extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      data:{}
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createNestedJsx = this.createNestedJsx.bind(this);
    this.createNode = this.createNode.bind(this);
    this.fields = [];

  }

  onSubmit = (e) => {
    e.preventDefault();
    const d = JSON.parse(JSON.stringify(this.state.data));
    let data = JSON.parse(JSON.stringify(this.props.config.items));
    recurseData(data, d);

    this.props.onSubmit(data); // dont edit this line
  };

  handleChange(e){
    let { data } = this.state;
    let attr = e.target.name;
    let value = e.target.value;
    data[attr] = value;
    this.setState({data});
  }

  


  createNestedJsx(items, parentStr, acc){
    items.forEach((v,i) => {
      if(v.children){
        acc.push(this.createNode(v, parentStr));
        this.createNestedJsx(v.children.items, parentStr.length ? (parentStr + '.' + v.name) : v.name, acc);
      } else {
        acc.push(this.createNode(v, parentStr));
      }
    });
    this.forceUpdate();
  }


  createNode(v, parentStr){
    let { data } = this.state;
    let newName = parentStr.length ? (parentStr + '.'+ v.name) : v.name;
    
    let html;
    if(v.type === 'TextField'){
        html = <div key = {newName}>
          <br/>
          <label>{v.label}</label>
          <input type="text" name={newName} value={data[newName]} onChange={this.handleChange} />
        </div>
      } 
      else if (v.type === 'DropDown'){
        html = <div key = {newName}>
          <br/>
          <label>{v.label}</label>
          <select name={newName} value={data[newName]} onChange={this.handleChange}>
            {
              v.values.map((v1,i1) => {
                return <option key={v1+' ' +i1} name={v1} value={v1}>{v1}</option>
              })
            }
          </select>
        </div>
      }

      return html;
  }

  render() {
    let fields = this.fields;
    return (
      <form>
        {
          fields.length ? fields : ''
        }
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }


  componentDidMount(){
    this.createNestedJsx(this.props.config.items,'', this.fields);
  }
}

export default Flexi;