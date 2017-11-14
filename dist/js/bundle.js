function HeaderSearch(){$(".header-search").append('            <div class="search-container">\n            <div class="logo">\n                <h1>Google</h1>\n            </div>\n            <div class="search">\n                <div id="header-search" class="input open">\n                    <i class="fa fa-search" aria-hidden="true"></i>\n                    <input type="search" placeholder="Search..." value="" autofocus>\n                    <button class="btn button"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>\n                </div>\n            </div>\n        </div>'),$(".header-search").hide(),$(".header-search").fadeIn("slow"),$(".content").fadeOut();var t=$("#header-search input");new Submitting($("#header-search button"),t,1)}function Image(t){this.result=t,this.title=t.title,this.displayLink=t.displayLink,this.link=t.link,this.width=t.image.width,this.height=t.image.height,this.thumbnail=t.image.thumbnailLink,this.printImage()}function landingSearch(t){this.icon=t,this.env=$(".landing"),this.container=$(".search");var e=this;this.icon.click(function(){e.PrepareInput()}),this.env.click(function(){e.CloseInput()}),this.container.click(function(t){e.PreventClosing(t)})}function Page(t){this.result=t,this.displayLink=t.displayLink,this.title=t.htmlTitle,this.snippet=t.htmlSnippet,this.url=t.link,this.printPage()}function SearchResult(t){this.search=t,this.results=t.searchInformation.formattedTotalResults,this.time=t.searchInformation.formattedSearchTime}function Submitting(t,e,i){this.button=t,this.input=e,this.headerSearch=i;var n=this;this.input.keyup(function(){n.displayButton()}),this.button.click(function(){n.Submit()})}Image.prototype={result:null,title:null,displayLink:null,link:null,width:null,height:null,thumbnail:null,printImage:function(){var t='<div class="image-result"><div class="thumbnail"><img src="'+this.thumbnail+'" alt="'+this.title+'"></div><div class="size-link">'+this.width+"x"+this.height+" - "+this.displayLink+"</div></div>";$(".images .results").append(t)}},landingSearch.prototype={icon:null,PrepareInput:function(){$("#landing-search").toggleClass("open"),$("#landing-search button").hide()},CloseInput:function(){$("#landing-search").removeClass("open")},PreventClosing:function(t){t.stopPropagation()}},Page.prototype={result:null,displayLink:null,title:null,snippet:null,url:null,image:null,results:null,time:null,printPage:function(){var t='<div class="page-result"><div class="title"><a href="'+this.url+'">'+this.title+'</a></div><div class="link"><a href="'+this.url+'">'+this.url+'</a></div><div class="snippet"><p>'+this.snippet+"</p></div></div>";$(".pages .results").append(t)}},SearchResult.prototype={printPagesInfo:function(){var t='<div class="page-result-info">   <div class="info"><span>Total pages found: '+this.results+" ("+this.time+" s)</span></div></div>";$(".pages .info").append(t)},printImagesInfo:function(){var t='<div class="page-result-info">   <div class="info"><span>Total images found:  '+this.results+" ("+this.time+" s)</span></div></div>";$(".images .info").append(t)}},Submitting.prototype={button:null,input:null,current_page:null,headerSearch:null,displayButton:function(){this.input.val().length>=1?this.button.fadeIn("slow"):this.button.fadeOut("slow")},Submit:function(){this.exchangeSearches(),this.loadPage()},exchangeSearches:function(){this.headerSearch||(this.headerSearch=new HeaderSearch,$(".content").fadeOut())},loadPage:function(t){void 0===t&&(t=1),this.current_page=parseInt(t);var e=10*(this.current_page-1)+1;this.emptyResults(),this.displayLoading(),this.sendAjaxCall(this.input.val(),e)},emptyResults:function(){$(".images .results").empty(),$(".images .info").empty(),$(".pages .results").empty(),$(".pages .info").empty(),$("#buttons").empty()},displayLoading:function(){var t='<i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>';$(".images .results").append(t),$(".pages .results").append(t)},endLoading:function(){$(".pages .results .loading").detach(),$(".images .results .loading").detach()},sendAjaxCall:function(t,e){var i=this;$.ajax({url:"https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start="+e+"&q="+t,type:"get",data:{}}).done(function(t){i.displaySearchInfo("page",t),i.displayResults("page",t),i.endLoading(),i.generatePaginationButtons(),i.highlightCurrentPaginationButton(t)}),$.ajax({url:"https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start="+e+"&searchType=image&q="+t,type:"get",data:{}}).done(function(t){i.displaySearchInfo("image",t),i.displayResults("image",t),i.endLoading()})},displaySearchInfo:function(t,e){if("image"==t){new SearchResult(e).printImagesInfo()}else{new SearchResult(e).printPagesInfo()}},displayResults:function(t,e){if("image"==t)for(i=0;i<e.items.length;i++)new Image(e.items[i]);else for(var i=0;i<e.items.length;i++)new Page(e.items[i])},generatePaginationButtons:function(){var t=this;$("#buttons").empty();for(var e=-2;e<=2;e++)if(!(this.current_page+e<=0)){var i=document.createElement("button");i.innerHTML=this.current_page+e,$("#buttons").append($(i)),i.setAttribute("data-nr",this.current_page+e),i.addEventListener("click",function(e){e.preventDefault(),t.loadPage(e.target.getAttribute("data-nr"))}.bind(this))}},highlightCurrentPaginationButton:function(t){var e=(t.queries.nextPage[0].startIndex-1)/10;$("#buttons button[data-nr="+e+"]").addClass("active")}};