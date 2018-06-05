const STORAGE_KEY = 'todos-vuejs'
const KSHZ_KEY = 'kshz'
const COOKIE_KEY  = 'LACTK'
export default {
	fetch: function() {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
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
	removeItem:function(){
		window.localStorage.removeItem(STORAGE_KEY)
	},
	fetchcookie: function() {
		return window.localStorage.getItem(COOKIE_KEY) || ''
	},
}
