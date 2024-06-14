import { svgInterface } from "@maps/interfaces/typesSgv.interface";
import { CONSTANTES } from "@utils/constantes";

export const svgArray: svgInterface = {
  flame: `<svg class="icon icon-tabler icon-tabler-flame" width="20" height="20"
      viewBox="0 0 24 24" stroke-width="1.5" stroke="${CONSTANTES.COLORS.RED}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
    </svg>`,
  droplet: `<svg class="icon icon-tabler icon-tabler-droplet" width="20" height="20"
    viewBox="0 0 24 24" stroke-width="1.5" stroke="${CONSTANTES.COLORS.BLUE}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z" />
    </svg>`,
  tree: `<svg class="icon icon-tabler icon-tabler-tree" width="20" height="20"
      viewBox="0 0 24 24" stroke-width="1.5" stroke="${CONSTANTES.COLORS.GREEN}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 13l-2 -2" />
      <path d="M12 12l2 -2" />
      <path d="M12 21v-13" />
      <path
        d="M9.824 16a3 3 0 0 1 -2.743 -3.69a3 3 0 0 1 .304 -4.833a3 3 0 0 1 4.615 -3.707a3 3 0 0 1 4.614 3.707a3 3 0 0 1 .305 4.833a3 3 0 0 1 -2.919 3.695h-4z" />
    </svg>`
}

export const typeSVG = (humidity: number, size?:number ): string => {

  // 0 - 30 yellow , 40 - 60 green , 60 - 100 lightblue
  if (humidity >= 0 && humidity < 30) {
    return svgArray.flame;
  }
  if (humidity >= 30 && humidity < 60) {
    return svgArray.tree;
  }
  if (humidity >= 60 && humidity <= 100) {
    return svgArray.droplet;
  }
  return '';

}

