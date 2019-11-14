import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";

const Search= () => {
    return(
<div style={{position:"absolute",top:"20px",right:"10px",width:"350px",height:"300px",padding:"5px",}}>
<form class="form-inline">
<MDBIcon icon="search" />
  <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
    aria-label="Search"/>
</form>
</div>
    )
  }

  export default Search;

