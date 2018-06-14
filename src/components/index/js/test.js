const STORAGE_KEY = 'todos-vuejs'
const KSHZ_KEY = 'kshz'
const COOKIE_KEY  = 'LACTK'
const CODE_KEY = 'codeobj'
export default {
	fetch: function() {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
  codefetch:function(){
    return JSON.parse(window.localStorage.getItem(CODE_KEY) || '{}')
  },
    kshzfetch: function(){
        return JSON.parse(window.localStorage.getItem(KSHZ_KEY) || '[]')
    },
    removeHz:function(){
        window.localStorage.removeItem(KSHZ_KEY)
    },
	save: function(items) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
	},
  saveCode: function (codeObj) {
    window.localStorage.setItem(CODE_KEY, JSON.stringify(codeObj))
  },
	removeItem:function(){
		window.localStorage.removeItem(CODE_KEY)
	},
  removeCode:function(CODE_KEY){
    window.localStorage.removeItem(CODE_KEY)
  },
	fetchcookie: function() {
		return window.localStorage.getItem(COOKIE_KEY) || ''
	},
}
