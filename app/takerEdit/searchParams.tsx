"use client"

import { useSearchParams } from 'next/navigation'

export function PassDataTaker() { 
  const searchParams = new URLSearchParams(useSearchParams());
  
  let idTaker = searchParams.get(decodeURIComponent('idTaker'));
  let cnpj = searchParams.get(decodeURIComponent('cnpj'));
  let razaoSocial = searchParams.get(decodeURIComponent('razaoSocial'));
  let telUm = searchParams.get(decodeURIComponent('telUm'));
  let emailUm = searchParams.get(decodeURIComponent('emailUm'));
  let contatoUm = searchParams.get(decodeURIComponent('contatoUm'));
  let telDois = searchParams.get(decodeURIComponent('telDois'));
  let emailDois = searchParams.get(decodeURIComponent('emailDois'));
  let contatoDois = searchParams.get(decodeURIComponent('contatoDois'));


//return idTaker?.toString() + ";" + cnpj?.toString() + ";" + razaoSocial?.toString() + ";" + telUm?.toString() + ";"

  return idTaker?.toString() + ";" + cnpj?.toString() + ";" + razaoSocial?.toString() + ";" + telUm?.toString() + ";" + emailUm?.toString()  + ";" + contatoUm?.toString() + ";" + telDois?.toString() + ";" + emailDois?.toString()  + ";" + contatoDois?.toString();
  }

  
