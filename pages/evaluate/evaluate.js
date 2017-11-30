Page({
	data:{
		disagree:true,
		common:true,
		agree:true,
	},
	onagree:function(e){
		this.setData({
			disagree:true,
			common:true,
			agree:false,
		})
	},
	oncommon:function(e){
		this.setData({
			disagree:true,
			common:false,
			agree:true,
		})
	},
	ondisagree:function(e){
		this.setData({
			disagree:false,
			common:true,
			agree:true,
		})
	}

})