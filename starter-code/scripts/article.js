'use strict';

var articles = [];

function Article (rawDataObj) {
  // this.author = rawDataObj.author;
  // this.authorUrl = rawDataObj.authorUrl;
  // this.title = rawDataObj.title;
  // this.category = rawDataObj.category;
  // this.body = rawDataObj.body;
  // this.publishedOn = rawDataObj.publishedOn;
  for (var key in rawDataObj) {
    this[key] = rawDataObj[key];
  }
}

Article.prototype.toHtml = function() {
  // TODO: Use handlebars to render your articles.
  //       - Get your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  var template = $('#article-template').html();
  var templateRender = Handlebars.compile(template);


  // REVIEW: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced by key in the template.
  //   For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // TODO: Use the function that Handlebars gave you to return your filled-in html template for THIS article.
  return templateRender(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});
