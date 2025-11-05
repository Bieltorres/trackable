"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, User, Mail, Lock, Calendar, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Lista completa de países com códigos telefônicos e bandeiras
const paises = [
  {
    codigo: "+93",
    nome: "Afeganistão",
    bandeira: "🇦🇫",
    mascara: "00 000 0000",
  },
  {
    codigo: "+27",
    nome: "África do Sul",
    bandeira: "🇿🇦",
    mascara: "00 000 0000",
  },
  { codigo: "+355", nome: "Albânia", bandeira: "🇦🇱", mascara: "00 000 0000" },
  { codigo: "+49", nome: "Alemanha", bandeira: "🇩🇪", mascara: "000 0000000" },
  { codigo: "+376", nome: "Andorra", bandeira: "🇦🇩", mascara: "000 000" },
  { codigo: "+244", nome: "Angola", bandeira: "🇦🇴", mascara: "000 000 000" },
  { codigo: "+1264", nome: "Anguilla", bandeira: "🇦🇮", mascara: "000 0000" },
  {
    codigo: "+1268",
    nome: "Antígua e Barbuda",
    bandeira: "🇦🇬",
    mascara: "000 0000",
  },
  {
    codigo: "+966",
    nome: "Arábia Saudita",
    bandeira: "🇸🇦",
    mascara: "0 000 0000",
  },
  {
    codigo: "+213",
    nome: "Argélia",
    bandeira: "🇩🇿",
    mascara: "00 00 00 00 00",
  },
  { codigo: "+54", nome: "Argentina", bandeira: "🇦🇷", mascara: "00 0000-0000" },
  { codigo: "+374", nome: "Armênia", bandeira: "🇦🇲", mascara: "00 000000" },
  { codigo: "+297", nome: "Aruba", bandeira: "🇦🇼", mascara: "000 0000" },
  { codigo: "+61", nome: "Austrália", bandeira: "🇦🇺", mascara: "0 0000 0000" },
  { codigo: "+43", nome: "Áustria", bandeira: "🇦🇹", mascara: "000 000000" },
  {
    codigo: "+994",
    nome: "Azerbaijão",
    bandeira: "🇦🇿",
    mascara: "00 000 00 00",
  },
  { codigo: "+1242", nome: "Bahamas", bandeira: "🇧🇸", mascara: "000 0000" },
  { codigo: "+973", nome: "Bahrein", bandeira: "🇧🇭", mascara: "0000 0000" },
  { codigo: "+880", nome: "Bangladesh", bandeira: "🇧🇩", mascara: "00 000 000" },
  { codigo: "+1246", nome: "Barbados", bandeira: "🇧🇧", mascara: "000 0000" },
  { codigo: "+375", nome: "Belarus", bandeira: "🇧🇾", mascara: "00 000-00-00" },
  { codigo: "+32", nome: "Bélgica", bandeira: "🇧🇪", mascara: "000 00 00 00" },
  { codigo: "+501", nome: "Belize", bandeira: "🇧🇿", mascara: "000 0000" },
  { codigo: "+229", nome: "Benin", bandeira: "🇧🇯", mascara: "00 00 00 00" },
  { codigo: "+1441", nome: "Bermudas", bandeira: "🇧🇲", mascara: "000 0000" },
  { codigo: "+975", nome: "Butão", bandeira: "🇧🇹", mascara: "0 000 000" },
  { codigo: "+591", nome: "Bolívia", bandeira: "🇧🇴", mascara: "0 000 0000" },
  {
    codigo: "+387",
    nome: "Bósnia e Herzegovina",
    bandeira: "🇧🇦",
    mascara: "00 000 000",
  },
  { codigo: "+267", nome: "Botsuana", bandeira: "🇧🇼", mascara: "00 000 000" },
  { codigo: "+55", nome: "Brasil", bandeira: "🇧🇷", mascara: "(00) 00000-0000" },
  { codigo: "+673", nome: "Brunei", bandeira: "🇧🇳", mascara: "000 0000" },
  { codigo: "+359", nome: "Bulgária", bandeira: "🇧🇬", mascara: "00 000 0000" },
  {
    codigo: "+226",
    nome: "Burkina Faso",
    bandeira: "🇧🇫",
    mascara: "00 00 00 00",
  },
  { codigo: "+257", nome: "Burundi", bandeira: "🇧🇮", mascara: "00 00 00 00" },
  { codigo: "+238", nome: "Cabo Verde", bandeira: "🇨🇻", mascara: "000 00 00" },
  { codigo: "+855", nome: "Camboja", bandeira: "🇰🇭", mascara: "00 000 000" },
  {
    codigo: "+237",
    nome: "Camarões",
    bandeira: "🇨🇲",
    mascara: "0 00 00 00 00",
  },
  { codigo: "+1", nome: "Canadá", bandeira: "🇨🇦", mascara: "(000) 000-0000" },
  { codigo: "+974", nome: "Catar", bandeira: "🇶🇦", mascara: "0000 0000" },
  {
    codigo: "+7",
    nome: "Cazaquistão",
    bandeira: "🇰🇿",
    mascara: "000 000 00 00",
  },
  { codigo: "+235", nome: "Chade", bandeira: "🇹🇩", mascara: "00 00 00 00" },
  { codigo: "+420", nome: "Chéquia", bandeira: "🇨🇿", mascara: "000 000 000" },
  { codigo: "+56", nome: "Chile", bandeira: "🇨🇱", mascara: "0 0000 0000" },
  { codigo: "+86", nome: "China", bandeira: "🇨🇳", mascara: "000 0000 0000" },
  { codigo: "+357", nome: "Chipre", bandeira: "🇨🇾", mascara: "00 000000" },
  { codigo: "+65", nome: "Singapura", bandeira: "🇸🇬", mascara: "0000 0000" },
  { codigo: "+57", nome: "Colômbia", bandeira: "🇨🇴", mascara: "000 000 0000" },
  { codigo: "+269", nome: "Comores", bandeira: "🇰🇲", mascara: "000 00 00" },
  { codigo: "+242", nome: "Congo", bandeira: "🇨🇬", mascara: "00 000 0000" },
  {
    codigo: "+243",
    nome: "Congo (RDC)",
    bandeira: "🇨🇩",
    mascara: "000 000 000",
  },
  {
    codigo: "+850",
    nome: "Coreia do Norte",
    bandeira: "🇰🇵",
    mascara: "000 0000 0000",
  },
  {
    codigo: "+82",
    nome: "Coreia do Sul",
    bandeira: "🇰🇷",
    mascara: "00 0000 0000",
  },
  {
    codigo: "+225",
    nome: "Costa do Marfim",
    bandeira: "🇨🇮",
    mascara: "00 00 00 00 00",
  },
  { codigo: "+506", nome: "Costa Rica", bandeira: "🇨🇷", mascara: "0000 0000" },
  { codigo: "+385", nome: "Croácia", bandeira: "🇭🇷", mascara: "00 000 0000" },
  { codigo: "+53", nome: "Cuba", bandeira: "🇨🇺", mascara: "0 000 0000" },
  { codigo: "+599", nome: "Curaçao", bandeira: "🇨🇼", mascara: "0 000 0000" },
  { codigo: "+45", nome: "Dinamarca", bandeira: "🇩🇰", mascara: "00 00 00 00" },
  { codigo: "+253", nome: "Djibuti", bandeira: "🇩🇯", mascara: "00 00 00 00" },
  { codigo: "+1767", nome: "Dominica", bandeira: "🇩🇲", mascara: "000 0000" },
  { codigo: "+20", nome: "Egito", bandeira: "🇪🇬", mascara: "00 0000 0000" },
  { codigo: "+503", nome: "El Salvador", bandeira: "🇸🇻", mascara: "0000 0000" },
  {
    codigo: "+971",
    nome: "Emirados Árabes Unidos",
    bandeira: "🇦🇪",
    mascara: "0 000 0000",
  },
  { codigo: "+593", nome: "Equador", bandeira: "🇪🇨", mascara: "00 000 0000" },
  { codigo: "+291", nome: "Eritreia", bandeira: "🇪🇷", mascara: "0 000 000" },
  {
    codigo: "+421",
    nome: "Eslováquia",
    bandeira: "🇸🇰",
    mascara: "000 000 000",
  },
  { codigo: "+386", nome: "Eslovênia", bandeira: "🇸🇮", mascara: "00 000 000" },
  { codigo: "+34", nome: "Espanha", bandeira: "🇪🇸", mascara: "000 00 00 00" },
  {
    codigo: "+1",
    nome: "Estados Unidos",
    bandeira: "🇺🇸",
    mascara: "(000) 000-0000",
  },
  { codigo: "+372", nome: "Estônia", bandeira: "🇪🇪", mascara: "0000 0000" },
  { codigo: "+268", nome: "Eswatini", bandeira: "🇸🇿", mascara: "0000 0000" },
  { codigo: "+251", nome: "Etiópia", bandeira: "🇪🇹", mascara: "00 000 0000" },
  { codigo: "+679", nome: "Fiji", bandeira: "🇫🇯", mascara: "000 0000" },
  { codigo: "+358", nome: "Finlândia", bandeira: "🇫🇮", mascara: "00 000 0000" },
  { codigo: "+33", nome: "França", bandeira: "🇫🇷", mascara: "00 00 00 00 00" },
  { codigo: "+241", nome: "Gabão", bandeira: "🇬🇦", mascara: "0 00 00 00" },
  { codigo: "+220", nome: "Gâmbia", bandeira: "🇬🇲", mascara: "000 0000" },
  { codigo: "+233", nome: "Gana", bandeira: "🇬🇭", mascara: "00 000 0000" },
  { codigo: "+995", nome: "Geórgia", bandeira: "🇬🇪", mascara: "000 00 00 00" },
  { codigo: "+350", nome: "Gibraltar", bandeira: "🇬🇮", mascara: "0000 0000" },
  { codigo: "+1473", nome: "Granada", bandeira: "🇬🇩", mascara: "000 0000" },
  { codigo: "+30", nome: "Grécia", bandeira: "🇬🇷", mascara: "00 0000 0000" },
  { codigo: "+299", nome: "Groenlândia", bandeira: "🇬🇱", mascara: "00 00 00" },
  {
    codigo: "+590",
    nome: "Guadalupe",
    bandeira: "🇬🇵",
    mascara: "000 00 00 00",
  },
  { codigo: "+1671", nome: "Guam", bandeira: "🇬🇺", mascara: "000 0000" },
  { codigo: "+502", nome: "Guatemala", bandeira: "🇬🇹", mascara: "0000 0000" },
  { codigo: "+44", nome: "Guernsey", bandeira: "🇬🇬", mascara: "0000 000000" },
  { codigo: "+224", nome: "Guiné", bandeira: "🇬🇳", mascara: "000 00 00 00" },
  { codigo: "+245", nome: "Guiné-Bissau", bandeira: "🇬🇼", mascara: "000 0000" },
  {
    codigo: "+240",
    nome: "Guiné Equatorial",
    bandeira: "🇬🇶",
    mascara: "000 000 000",
  },
  { codigo: "+592", nome: "Guiana", bandeira: "🇬🇾", mascara: "000 0000" },
  {
    codigo: "+594",
    nome: "Guiana Francesa",
    bandeira: "🇬🇫",
    mascara: "000 00 00 00",
  },
  { codigo: "+509", nome: "Haiti", bandeira: "🇭🇹", mascara: "00 00 0000" },
  { codigo: "+504", nome: "Honduras", bandeira: "🇭🇳", mascara: "0000 0000" },
  { codigo: "+852", nome: "Hong Kong", bandeira: "🇭🇰", mascara: "0000 0000" },
  { codigo: "+36", nome: "Hungria", bandeira: "🇭🇺", mascara: "00 000 0000" },
  { codigo: "+967", nome: "Iêmen", bandeira: "🇾🇪", mascara: "0 000 000" },
  { codigo: "+500", nome: "Ilhas Malvinas", bandeira: "🇫🇰", mascara: "00000" },
  { codigo: "+298", nome: "Ilhas Faroé", bandeira: "🇫🇴", mascara: "000000" },
  {
    codigo: "+1345",
    nome: "Ilhas Cayman",
    bandeira: "🇰🇾",
    mascara: "000 0000",
  },
  { codigo: "+682", nome: "Ilhas Cook", bandeira: "🇨🇰", mascara: "00 000" },
  {
    codigo: "+692",
    nome: "Ilhas Marshall",
    bandeira: "🇲🇭",
    mascara: "000 0000",
  },
  { codigo: "+677", nome: "Ilhas Salomão", bandeira: "🇸🇧", mascara: "00000" },
  {
    codigo: "+1649",
    nome: "Ilhas Turks e Caicos",
    bandeira: "🇹🇨",
    mascara: "000 0000",
  },
  {
    codigo: "+1340",
    nome: "Ilhas Virgens Americanas",
    bandeira: "🇻🇮",
    mascara: "000 0000",
  },
  {
    codigo: "+1284",
    nome: "Ilhas Virgens Britânicas",
    bandeira: "🇻🇬",
    mascara: "000 0000",
  },
  { codigo: "+91", nome: "Índia", bandeira: "🇮🇳", mascara: "00000 00000" },
  {
    codigo: "+62",
    nome: "Indonésia",
    bandeira: "🇮🇩",
    mascara: "000 0000 0000",
  },
  { codigo: "+98", nome: "Irã", bandeira: "🇮🇷", mascara: "000 000 0000" },
  { codigo: "+964", nome: "Iraque", bandeira: "🇮🇶", mascara: "000 000 0000" },
  { codigo: "+353", nome: "Irlanda", bandeira: "🇮🇪", mascara: "00 000 0000" },
  { codigo: "+354", nome: "Islândia", bandeira: "🇮🇸", mascara: "000 0000" },
  { codigo: "+972", nome: "Israel", bandeira: "🇮🇱", mascara: "00 000 0000" },
  { codigo: "+39", nome: "Itália", bandeira: "🇮🇹", mascara: "000 000 0000" },
  { codigo: "+1876", nome: "Jamaica", bandeira: "🇯🇲", mascara: "000 0000" },
  { codigo: "+81", nome: "Japão", bandeira: "🇯🇵", mascara: "00 0000 0000" },
  { codigo: "+44", nome: "Jersey", bandeira: "🇯🇪", mascara: "0000 000000" },
  { codigo: "+962", nome: "Jordânia", bandeira: "🇯🇴", mascara: "0 0000 0000" },
  { codigo: "+254", nome: "Quênia", bandeira: "🇰🇪", mascara: "000 000000" },
  {
    codigo: "+996",
    nome: "Quirguistão",
    bandeira: "🇰🇬",
    mascara: "000 000 000",
  },
  { codigo: "+686", nome: "Kiribati", bandeira: "🇰🇮", mascara: "00000" },
  { codigo: "+383", nome: "Kosovo", bandeira: "🇽🇰", mascara: "00 000 000" },
  { codigo: "+965", nome: "Kuwait", bandeira: "🇰🇼", mascara: "0000 0000" },
  { codigo: "+856", nome: "Laos", bandeira: "🇱🇦", mascara: "00 00 000 000" },
  { codigo: "+266", nome: "Lesoto", bandeira: "🇱🇸", mascara: "0000 0000" },
  { codigo: "+371", nome: "Letônia", bandeira: "🇱🇻", mascara: "00 000 000" },
  { codigo: "+961", nome: "Líbano", bandeira: "🇱🇧", mascara: "00 000 000" },
  { codigo: "+231", nome: "Libéria", bandeira: "🇱🇷", mascara: "00 000 0000" },
  { codigo: "+218", nome: "Líbia", bandeira: "🇱🇾", mascara: "00 000 0000" },
  {
    codigo: "+423",
    nome: "Liechtenstein",
    bandeira: "🇱🇮",
    mascara: "000 00 00",
  },
  { codigo: "+370", nome: "Lituânia", bandeira: "🇱🇹", mascara: "000 00000" },
  {
    codigo: "+352",
    nome: "Luxemburgo",
    bandeira: "🇱🇺",
    mascara: "000 000 000",
  },
  { codigo: "+853", nome: "Macau", bandeira: "🇲🇴", mascara: "0000 0000" },
  {
    codigo: "+389",
    nome: "Macedônia do Norte",
    bandeira: "🇲🇰",
    mascara: "00 000 000",
  },
  {
    codigo: "+261",
    nome: "Madagascar",
    bandeira: "🇲🇬",
    mascara: "00 00 000 00",
  },
  { codigo: "+60", nome: "Malásia", bandeira: "🇲🇾", mascara: "00 0000 0000" },
  { codigo: "+265", nome: "Malawi", bandeira: "🇲🇼", mascara: "0 000 0000" },
  { codigo: "+960", nome: "Maldivas", bandeira: "🇲🇻", mascara: "000 0000" },
  { codigo: "+223", nome: "Mali", bandeira: "🇲🇱", mascara: "00 00 00 00" },
  { codigo: "+356", nome: "Malta", bandeira: "🇲🇹", mascara: "0000 0000" },
  {
    codigo: "+44",
    nome: "Ilha de Man",
    bandeira: "🇮🇲",
    mascara: "0000 000000",
  },
  { codigo: "+212", nome: "Marrocos", bandeira: "🇲🇦", mascara: "00 0000 0000" },
  {
    codigo: "+596",
    nome: "Martinica",
    bandeira: "🇲🇶",
    mascara: "000 00 00 00",
  },
  { codigo: "+230", nome: "Maurício", bandeira: "🇲🇺", mascara: "0000 0000" },
  {
    codigo: "+222",
    nome: "Mauritânia",
    bandeira: "🇲🇷",
    mascara: "00 00 00 00",
  },
  { codigo: "+262", nome: "Mayotte", bandeira: "🇾🇹", mascara: "000 00 00 00" },
  { codigo: "+52", nome: "México", bandeira: "🇲🇽", mascara: "00 0000 0000" },
  { codigo: "+691", nome: "Micronésia", bandeira: "🇫🇲", mascara: "000 0000" },
  { codigo: "+373", nome: "Moldávia", bandeira: "🇲🇩", mascara: "00 000 000" },
  { codigo: "+377", nome: "Mônaco", bandeira: "🇲🇨", mascara: "00 00 00 00" },
  { codigo: "+976", nome: "Mongólia", bandeira: "🇲🇳", mascara: "00 00 0000" },
  { codigo: "+382", nome: "Montenegro", bandeira: "🇲🇪", mascara: "00 000 000" },
  { codigo: "+1664", nome: "Montserrat", bandeira: "🇲🇸", mascara: "000 0000" },
  {
    codigo: "+258",
    nome: "Moçambique",
    bandeira: "🇲🇿",
    mascara: "00 000 0000",
  },
  { codigo: "+95", nome: "Myanmar", bandeira: "🇲🇲", mascara: "00 000 0000" },
  { codigo: "+264", nome: "Namíbia", bandeira: "🇳🇦", mascara: "00 000 0000" },
  { codigo: "+674", nome: "Nauru", bandeira: "🇳🇷", mascara: "000 0000" },
  { codigo: "+977", nome: "Nepal", bandeira: "🇳🇵", mascara: "00 0000 0000" },
  { codigo: "+505", nome: "Nicarágua", bandeira: "🇳🇮", mascara: "0000 0000" },
  { codigo: "+227", nome: "Níger", bandeira: "🇳🇪", mascara: "00 00 00 00" },
  { codigo: "+234", nome: "Nigéria", bandeira: "🇳🇬", mascara: "00 0000 0000" },
  { codigo: "+683", nome: "Niue", bandeira: "🇳🇺", mascara: "0000" },
  { codigo: "+47", nome: "Noruega", bandeira: "🇳🇴", mascara: "000 00 000" },
  {
    codigo: "+687",
    nome: "Nova Caledônia",
    bandeira: "🇳🇨",
    mascara: "00 00 00",
  },
  {
    codigo: "+64",
    nome: "Nova Zelândia",
    bandeira: "🇳🇿",
    mascara: "00 000 0000",
  },
  { codigo: "+968", nome: "Omã", bandeira: "🇴🇲", mascara: "0000 0000" },
  {
    codigo: "+31",
    nome: "Países Baixos",
    bandeira: "🇳🇱",
    mascara: "00 0000 0000",
  },
  { codigo: "+680", nome: "Palau", bandeira: "🇵🇼", mascara: "000 0000" },
  { codigo: "+970", nome: "Palestina", bandeira: "🇵🇸", mascara: "000 000 000" },
  { codigo: "+507", nome: "Panamá", bandeira: "🇵🇦", mascara: "0000 0000" },
  {
    codigo: "+675",
    nome: "Papua-Nova Guiné",
    bandeira: "🇵🇬",
    mascara: "000 0000",
  },
  { codigo: "+92", nome: "Paquistão", bandeira: "🇵🇰", mascara: "000 0000000" },
  { codigo: "+595", nome: "Paraguai", bandeira: "🇵🇾", mascara: "000 000000" },
  { codigo: "+51", nome: "Peru", bandeira: "🇵🇪", mascara: "000 000 000" },
  {
    codigo: "+689",
    nome: "Polinésia Francesa",
    bandeira: "🇵🇫",
    mascara: "00 00 00",
  },
  { codigo: "+48", nome: "Polônia", bandeira: "🇵🇱", mascara: "00 000 00 00" },
  { codigo: "+1787", nome: "Porto Rico", bandeira: "🇵🇷", mascara: "000 0000" },
  { codigo: "+351", nome: "Portugal", bandeira: "🇵🇹", mascara: "000 000 000" },
  {
    codigo: "+44",
    nome: "Reino Unido",
    bandeira: "🇬🇧",
    mascara: "0000 000 000",
  },
  {
    codigo: "+236",
    nome: "República Centro-Africana",
    bandeira: "🇨🇫",
    mascara: "00 00 00 00",
  },
  {
    codigo: "+1809",
    nome: "República Dominicana",
    bandeira: "🇩🇴",
    mascara: "000 000 0000",
  },
  { codigo: "+262", nome: "Reunião", bandeira: "🇷🇪", mascara: "000 00 00 00" },
  { codigo: "+40", nome: "Romênia", bandeira: "🇷🇴", mascara: "00 000 0000" },
  { codigo: "+250", nome: "Ruanda", bandeira: "🇷🇼", mascara: "000 000 000" },
  { codigo: "+7", nome: "Rússia", bandeira: "🇷🇺", mascara: "000 000 00 00" },
  { codigo: "+685", nome: "Samoa", bandeira: "🇼🇸", mascara: "00000" },
  {
    codigo: "+1684",
    nome: "Samoa Americana",
    bandeira: "🇦🇸",
    mascara: "000 0000",
  },
  {
    codigo: "+378",
    nome: "San Marino",
    bandeira: "🇸🇲",
    mascara: "0000 000000",
  },
  {
    codigo: "+239",
    nome: "São Tomé e Príncipe",
    bandeira: "🇸🇹",
    mascara: "000 0000",
  },
  { codigo: "+221", nome: "Senegal", bandeira: "🇸🇳", mascara: "00 000 00 00" },
  { codigo: "+232", nome: "Serra Leoa", bandeira: "🇸🇱", mascara: "00 000000" },
  { codigo: "+381", nome: "Sérvia", bandeira: "🇷🇸", mascara: "00 000 0000" },
  { codigo: "+248", nome: "Seychelles", bandeira: "🇸🇨", mascara: "0 000 000" },
  { codigo: "+963", nome: "Síria", bandeira: "🇸🇾", mascara: "00 0000 0000" },
  { codigo: "+252", nome: "Somália", bandeira: "🇸🇴", mascara: "00 000 0000" },
  { codigo: "+94", nome: "Sri Lanka", bandeira: "🇱🇰", mascara: "00 000 0000" },
  { codigo: "+249", nome: "Sudão", bandeira: "🇸🇩", mascara: "00 000 0000" },
  {
    codigo: "+211",
    nome: "Sudão do Sul",
    bandeira: "🇸🇸",
    mascara: "00 000 0000",
  },
  { codigo: "+46", nome: "Suécia", bandeira: "🇸🇪", mascara: "00 000 00 00" },
  { codigo: "+41", nome: "Suíça", bandeira: "🇨🇭", mascara: "00 000 00 00" },
  { codigo: "+597", nome: "Suriname", bandeira: "🇸🇷", mascara: "000 0000" },
  {
    codigo: "+992",
    nome: "Tadjiquistão",
    bandeira: "🇹🇯",
    mascara: "00 000 0000",
  },
  { codigo: "+66", nome: "Tailândia", bandeira: "🇹🇭", mascara: "00 000 0000" },
  { codigo: "+886", nome: "Taiwan", bandeira: "🇹🇼", mascara: "0000 000 000" },
  { codigo: "+255", nome: "Tanzânia", bandeira: "🇹🇿", mascara: "00 000 0000" },
  { codigo: "+690", nome: "Tokelau", bandeira: "🇹🇰", mascara: "0000" },
  { codigo: "+676", nome: "Tonga", bandeira: "🇹🇴", mascara: "00000" },
  {
    codigo: "+1868",
    nome: "Trinidad e Tobago",
    bandeira: "🇹🇹",
    mascara: "000 0000",
  },
  { codigo: "+216", nome: "Tunísia", bandeira: "🇹🇳", mascara: "00 000 000" },
  {
    codigo: "+993",
    nome: "Turcomenistão",
    bandeira: "🇹🇲",
    mascara: "00 000000",
  },
  { codigo: "+90", nome: "Turquia", bandeira: "🇹🇷", mascara: "000 000 00 00" },
  { codigo: "+688", nome: "Tuvalu", bandeira: "🇹🇻", mascara: "00000" },
  { codigo: "+380", nome: "Ucrânia", bandeira: "🇺🇦", mascara: "00 000 0000" },
  { codigo: "+256", nome: "Uganda", bandeira: "🇺🇬", mascara: "000 000000" },
  { codigo: "+598", nome: "Uruguai", bandeira: "🇺🇾", mascara: "0000 0000" },
  {
    codigo: "+998",
    nome: "Uzbequistão",
    bandeira: "🇺🇿",
    mascara: "00 000 00 00",
  },
  { codigo: "+678", nome: "Vanuatu", bandeira: "🇻🇺", mascara: "00000" },
  { codigo: "+39", nome: "Vaticano", bandeira: "🇻🇦", mascara: "000 000 0000" },
  { codigo: "+58", nome: "Venezuela", bandeira: "🇻🇪", mascara: "000 000 0000" },
  { codigo: "+84", nome: "Vietnã", bandeira: "🇻🇳", mascara: "00 0000 0000" },
  {
    codigo: "+681",
    nome: "Wallis e Futuna",
    bandeira: "🇼🇫",
    mascara: "00 00 00",
  },
  { codigo: "+260", nome: "Zâmbia", bandeira: "🇿🇲", mascara: "00 000 0000" },
  { codigo: "+263", nome: "Zimbábue", bandeira: "🇿🇼", mascara: "00 000 0000" },
];

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [genero, setGenero] = useState("");
  const [paisSelecionado, setPaisSelecionado] = useState("+55");
  const [searchPais, setSearchPais] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const paisesFiltrados = paises.filter(
    (pais) =>
      pais.nome.toLowerCase().includes(searchPais.toLowerCase()) ||
      pais.codigo.includes(searchPais)
  );

  const paisAtual =
    paises.find((p) => p.codigo === paisSelecionado) ||
    paises.find((p) => p.codigo === "+55")!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;
    const birthdate = (document.getElementById("birthdate") as HTMLInputElement)
      .value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não conferem",
        variant: "destructive",
      });
      return;
    }

    if (!genero) {
      toast({
        title: "Campo obrigatório",
        description: "Selecione uma opção de gênero para continuar",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        birthdate,
        phone: `${paisSelecionado} ${phone}`,
        genero,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: "Erro ao registrar",
        description: data.error || "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para a página de login",
      });

      // Aguarda 2 segundos antes de redirecionar
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  const handlePaisChange = (codigo: string) => {
    setPaisSelecionado(codigo);
    setSearchPais("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Cadastre-se gratuitamente e acesse nossos treinamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Data de Nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="birthdate" type="date" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genero">Gênero</Label>
              <Select value={genero || undefined} onValueChange={setGenero}>
                <SelectTrigger id="genero">
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="flex items-center gap-3">
                {/* País / DDI */}
                <Select
                  value={paisSelecionado}
                  onValueChange={handlePaisChange}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span>{paisAtual.bandeira}</span>
                        <span className="text-sm">{paisAtual.codigo}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <div className="p-2 border-b">
                      <Input
                        placeholder="Buscar país ou código..."
                        value={searchPais}
                        onChange={(e) => setSearchPais(e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="overflow-y-auto">
                      {paisesFiltrados.length > 0 ? (
                        paisesFiltrados.map((pais) => (
                          <SelectItem
                            key={`${pais.codigo}-${pais.nome}`}
                            value={pais.codigo}
                          >
                            <div className="flex items-center gap-2">
                              <span>{pais.bandeira}</span>
                              <span className="text-sm">{pais.codigo}</span>
                              <span className="text-sm text-muted-foreground truncate">
                                {pais.nome}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Nenhum país encontrado
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>

                {/* Input do número */}
                <div className="relative flex-1 min-w-[200px]">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={paisAtual.mascara}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                Aceito os{" "}
                <Link href="/termos" className="text-primary hover:underline">
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link
                  href="/privacidade"
                  className="text-primary hover:underline"
                >
                  política de privacidade
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!acceptTerms}>
              Criar Conta Gratuita
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
