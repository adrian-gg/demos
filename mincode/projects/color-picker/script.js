new Vue({
  el: "#app",

  data: {
    colorHex: "#000000",
  },

  computed: {
    rgb: function (hex) {
      hex = this.colorHex
      var computedC = 0
      var computedM = 0
      var computedY = 0
      var computedK = 0

      hex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex

      /*if (hex.length != 6) {
        console.log ('Invalid length of the input hex value!');   
        return; 
      }

      if (/[0-9a-f]{6}/i.test(hex) != true) {
        console.log ('Invalid digits in the input hex value!');
        return; 
      }*/

      var r = parseInt(hex.substring(0, 2), 16)
      var g = parseInt(hex.substring(2, 4), 16)
      var b = parseInt(hex.substring(4, 6), 16)

      return r + ", " + g + ", " + b
    },

    cmyk: function (hex) {
      hex = this.colorHex
      var computedC = 0
      var computedM = 0
      var computedY = 0
      var computedK = 0

      hex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex

      /*if (hex.length != 6) {
        console.log ('Invalid length of the input hex value!');   
        return; 
      }

      if (/[0-9a-f]{6}/i.test(hex) != true) {
        console.log ('Invalid digits in the input hex value!');
        return; 
      }*/

      var r = parseInt(hex.substring(0, 2), 16)
      var g = parseInt(hex.substring(2, 4), 16)
      var b = parseInt(hex.substring(4, 6), 16)

      computedC = 1 - r / 255
      computedM = 1 - g / 255
      computedY = 1 - b / 255

      var minCMY = Math.min(computedC, Math.min(computedM, computedY))

      computedC = (((computedC - minCMY) / (1 - minCMY)) * 100).toFixed(0)
      computedM = (((computedM - minCMY) / (1 - minCMY)) * 100).toFixed(0)
      computedY = (((computedY - minCMY) / (1 - minCMY)) * 100).toFixed(0)
      computedK = (minCMY * 100).toFixed(0)

      if (r == 0 && g == 0 && b == 0) {
        return 0 + ", " + 0 + ", " + 0 + ", " + 0
      } else {
        return (
          computedC + ", " + computedM + ", " + computedY + ", " + computedK
        )
      }
    },
  },
})
