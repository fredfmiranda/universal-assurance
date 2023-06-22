"use client"

import { useSearchParams } from 'next/navigation'

export function PassDataUser() { 
  const searchParams = new URLSearchParams(useSearchParams());
  const idUser = searchParams.get(decodeURIComponent('id'));
  const nomeUser = searchParams.get(decodeURIComponent('nome'));
  const loginUser = searchParams.get(decodeURIComponent('login'));
  return idUser?.toString() + ";" + nomeUser?.toString() + ";" + loginUser?.toString();
  }

  
