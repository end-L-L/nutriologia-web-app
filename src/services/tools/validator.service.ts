import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  required(input:any){
    return (input != undefined && input != null && input != "" && input.toString().trim().length > 0);
  }

  max(input:any, size:any){
    return (input.length <= size);
  }

  min(input:any, size:any){
    return (input.length >= size);
  }

  email(input:any){
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(regEx); // Invalid format
  }


  between(input:any, min:any, max:any){
    return (max >= input >= min);
  }

  numeric(input:any){
    return (!isNaN(parseFloat(input)) && isFinite(input));
  }

  maxDecimals(input:any, size:any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]){
      decimals = input.toString().split(".")[1].length
    }

    return (decimals <= size);
  }

  minDecimals(input:any, size:any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]){
      decimals = input.toString().split(".")[1].length
    }

    return (decimals >= size);
  }

  words(input:any){
    let pat = new RegExp('^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$');
    console.log(pat.test(input), input);
    return pat.test(input);
  }
}
