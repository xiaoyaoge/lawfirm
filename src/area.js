import {
    provinces,
    cities,
    areas
} from './area-data'
const CodeToText = {}
const TextToCode = {}
    // 深拷贝数组
const cloneArray = function(obj) {
    const newArray = []
    for (const i in obj) {
        newArray[i] = typeof obj[i] === 'object' ? cloneArray(obj[i]) : obj[i]
    }
    return newArray
}

const rootCode = '86'
const regionData = []
let provinceAndCityData = []

CodeToText['-1'] = '全部' 
 
for (const prop in provinces) {
    regionData.push({
        value: provinces[prop].id,
        label: provinces[prop].name
    })
    CodeToText[provinces[prop].id] = provinces[prop].name
    TextToCode[provinces[prop].name] = {
        code: provinces[prop].id
    }
    TextToCode[provinces[prop].name]['全部'] = {
        code: ''
    }
}
for (let i = 0; i < regionData.length; i++) {
    const provinceCode = regionData[i].value
    const provinceText = regionData[i].label
    const provinceChildren = []
    for (const prop in cities[provinceCode]) {

        provinceChildren.push({
            value: cities[provinceCode][prop].id,
            label: cities[provinceCode][prop].name
        })
        CodeToText[cities[provinceCode][prop].id] = cities[provinceCode][prop].name
        TextToCode[provinceText][cities[provinceCode][prop].name] = {
            code: prop
        }
        TextToCode[provinceText][cities[provinceCode][prop].name]['全部'] = {
            code: ''
        }
    }
    if (provinceChildren.length) {
        regionData[i].children = provinceChildren
    }
}

provinceAndCityData = cloneArray(regionData)

// 计算区
for (let i = 0; i < regionData.length; i++) {
    const province = regionData[i].children
    const provinceText = regionData[i].label
    if (province) {
        for (let j = 0; j < province.length; j++) {
            const cityCode = province[j].value
            const cityText = province[j].label
            const cityChildren = []
            for (const prop in areas[cityCode]) {
                cityChildren.push({
                    value: areas[cityCode][prop].id,
                    label: areas[cityCode][prop].name
                })
                CodeToText[areas[cityCode][prop].id] = areas[cityCode][prop].name
                TextToCode[provinceText][cityText][areas[cityCode][prop].name] = {
                    code: prop
                }
            }
            if (cityChildren.length) {
                province[j].children = cityChildren
            }
        }
    }
}

// 添加“全部”选项
const provinceAndCityDataPlus = cloneArray(provinceAndCityData)
provinceAndCityDataPlus.unshift({
    value: '',
    label: '全部'
})
for (let i = 0; i < provinceAndCityDataPlus.length; i++) {
    const province = provinceAndCityDataPlus[i].children
    if (province && province.length) {
        province.unshift({
            value: '',
            label: '全部'
        })

        for (let j = 0; j < province.length; j++) {
            const city = province[j].children
            if (city && city.length) {
                city.unshift({
                    value: '',
                    label: '全部'
                })
            }
        }
    }
}

const regionDataPlus = cloneArray(regionData)
regionDataPlus.unshift({
    value: '1',
    label: '全部'
})
for (let i = 0; i < regionDataPlus.length; i++) {
    const province = regionDataPlus[i].children
    if (province && province.length) {
        province.unshift({
            value: '1',
            label: '全部'
        })

        for (let j = 0; j < province.length; j++) {
            const city = province[j].children
            if (city && city.length) {
                city.unshift({
                    value: '1',
                    label: '全部'
                })
            }
        }
    }
}
export { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode }
