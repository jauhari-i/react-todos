// import React from 'react';
import React, { Component } from 'react'
import Modal from 'react-modal';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = { ff : [], modalIsOpen: false, modalData: [], key: []  }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  tambahData = e => {
    e.preventDefault()

    let jam = this.refs.jam.value
    let act = this.refs.act.value

    this.state.ff.push({ jam,act })
    this.setState({ ff : this.state.ff })

    this.refs.form.reset()
  }

  removeData = i => {
    this.state.ff.splice(i,1)
    this.setState({ ff: this.state.ff })
  }


  openModal(data, i) {
    console.log(i)
    this.setState({key: i})
    this.setState({modalData: data})
    this.setState({modalIsOpen: true})
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#333';
    let data = this.state.modalData

    this.refs.jamedit.value = data.jam
    this.refs.actedit.value = data.act

  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  saveData = a => {
    a.preventDefault()
    //define jam,act,id
    let jam = this.refs.jamedit.value
    let act = this.refs.actedit.value
    let key = this.state.key
    // set state and update data
    this.state.ff.splice(key,1,{jam,act})
    this.setState({ ff: this.state.ff, modalData: [] })
    //close modal
    this.setState({modalIsOpen: false});
  }
  
  render(){
    return(
     <div>
       <div style={{ marginTop: 20 +"%" }} className="App">
          <Header />
       </div>
       <div className="col-md-4 offset-4">
       <form ref="form" className="form-horizontal">
         <div className="form-group mx-sm-3 mb-2">
           <input type="time" ref="jam" placeholder="Jam Aktifitas" className="form-control mb-2"/>
           <input type="text" ref="act" placeholder="Aktivitas" className="form-control" />
         </div>
         <div className="form-group mx-sm-3 mb-2">
           <button  style={{
                marginTop: 20 +"px",
                marginLeft: 45 + "%"
              }}  onClick={this.tambahData} className="btn btn-info btn-flat">
             Save
           </button>
         </div>
       </form>
       </div>
       <hr/>
       <div className="col-md-4 offset-5">
         <ul className="list-group">
           {this.state.ff.map((data,i) => (

             <li className="list-item" key={i}>
               <div className="ml-2">
                 {data.jam} == {data.act}
               </div>
               <div className="row mt-3 ml-4">
                 <button className="btn btn-info mx-sm-2 mb-2" onClick={() => this.openModal(data,i)}>Edit</button>
                 <button className="btn btn-danger mx-sm-2 mb-2" onClick={() => this.removeData(i)}>Hapus</button>
               </div>
             </li>
           ))}
         </ul>
       </div>
       <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          // data={this.modalData}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <h2 className="text-center" ref={subtitle => this.subtitle = subtitle}>Edit Data</h2>
        
        <div className="text-center"> Please Edit!</div>
        <form ref="formedit" className="form-horizontal">
         <div className="form-group mx-sm-3 mb-2">
           <input type="time" ref="jamedit" placeholder="Jam Aktifitas" className="form-control mb-2 mt-3"/>
           <input type="text" ref="actedit" placeholder="Aktivitas" className="form-control" />
         </div>
         <div className="row offset-2">
           <button onClick={this.saveData} className="btn btn-info btn-flat">
             Save
           </button>
           <button className="btn btn-primary ml-2 btn-flat" onClick={this.closeModal}>Cancel</button>
         </div>
       </form>
      </Modal>
     </div> 
    )}

}

export default App;
