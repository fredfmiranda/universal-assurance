"use client"

import { useSearchParams } from 'next/navigation'

export function BuscaValorURL() { 
    const searchParams = new URLSearchParams(useSearchParams());
    const idSeguradora = searchParams.get(decodeURIComponent('id'));
    const nomeSeguradora = searchParams.get(decodeURIComponent('nome'));
    return idSeguradora?.toString() + ";" + nomeSeguradora?.toString();
  }

  
