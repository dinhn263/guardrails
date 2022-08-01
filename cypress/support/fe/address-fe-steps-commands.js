var AddressPage = require('../../pages/AddressPage')
var CreateAddressPage = require('../../pages/CreateAddressPage')

var addresspage = new AddressPage();
var createaddresspage = new CreateAddressPage();
Cypress.Commands.add('add_new_address', (address)=>{
    addresspage.clickBtnAddNewAddress();
    createaddresspage.setTxtCountry(address.country);
    createaddresspage.setTxtName(address.addressname);
    createaddresspage.setTxtMobile(address.mobile);
    createaddresspage.setTxtZipCode(address.zipcode);
    createaddresspage.setTxtAddress(address.addressdetail)
    createaddresspage.setTxtCity(address.city);
    createaddresspage.setTxtState(address.state);
    createaddresspage.clickBtnSubmit();
});
