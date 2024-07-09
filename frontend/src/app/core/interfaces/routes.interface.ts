import { Routes } from "@angular/router";

export interface routersLinksI {
  path: string,
  title: string
  children?: Routes,
  haveCan: boolean,
  icon?:string
}

