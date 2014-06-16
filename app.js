Meteor.startup(function() {
	if(Meteor.isClient) {
		console.log('Client: Meteor starting up.');

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Loading localised content
		 */
		Helpers.loadLocalisedContent();
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');
	}
});

/**
 <script type="text/javascript">
  (function(d) {
    var config = {
      kitId: 'tnk5zxe',
      scriptTimeout: 3000
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
</script>


<script type="text/javascript" src="//use.typekit.net/tnk5zxe.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

 */