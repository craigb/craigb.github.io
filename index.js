const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const jstransformer = require('metalsmith-jstransformer');
const debug = require('debug')('bild-blog');

Metalsmith(__dirname)
    .metadata({
        sitename: "Things I think and do",
        siteurl: "http://blog.craigboucher.com",
        description: "Herein are some things I think and do..."
    })
    .source('_source')
    .destination('_posts')
    .clean(true)
    .use(collections({
        posts: {
            pattern: "posts/*.md",
            sortBy: "date",
            reverse: true,
            metadata: {
                collection: "posts"
            }
        }
    }))
    .use(jstransformer({
        pattern: '**',
        layoutPattern: '_layouts/**',
        defaultLayout: null
    }))
    .use(function(files, metalsmith, done) {
        setImmediate(done);
        var metadata = metalsmith.metadata();
    })
    .build(function(err) {
        if (err) throw err;
    });
