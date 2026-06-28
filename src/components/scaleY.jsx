import { scaleLinear } from "d3";

export function scaleY(variable, rangeMin, rangeMax) {

    const var_min = Math.min(...variable)
    const var_max = Math.max(...variable)

    return scaleLinear()
    .domain([var_min, var_max])
    .range([rangeMax, rangeMin])

}