import { faker } from '@faker-js/faker';

export const generateRandomAddress = ()=>{
    var country = faker.address.country();
    var addressname = faker.name.firstName();
    var mobile = faker.phone.phoneNumber('501######');
    var addressdetail = faker.address.streetAddress();
    var city = faker.address.city();
    var state = faker.address.state();
    var zipcode = 70000;
    
    var address = {
    country: country,
    addressname: addressname,
    mobile: mobile,
    zipcode: zipcode,
    addressdetail: addressdetail,
    city: city,
    state: state
    }  
    return address;
}

export const generateUniqueNumbers = (nber, max)=>{
    var arr = [];
    while(arr.length < nber){
      var r = Math.floor(Math.random() * max) + 1;
      if(arr.indexOf(r) === -1){
        arr.push(r);
      }  
    }
    return arr;
}