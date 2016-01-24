/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Feed URL is defined and not Empty', function() {

            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feed name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* Test suite named "The menu" */
    describe('The Menu', function() {

        var btn = $('.menu-icon-link');

        //this class hides the menu, so if it is not available the menu is not hidden
        var body = $('body').hasClass('menu-hidden');

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The slide menu is hidden by default', function() {
            expect(body).toBeTruthy();
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles when icon is clicked', function() {

            btn.click(); //show menu
            body = $('body').hasClass('menu-hidden');
            expect(body).toBeFalsy();

            btn.click(); //hide menu
            body = $('body').hasClass('menu-hidden');
            expect(body).toBeTruthy();
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() { //activate the feed
                done();
            });
        });

        it('at least a single entry element is found', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This function checks if a new feed is loaded
        */
        var firstFeed;
        var feedNew;
        beforeEach(function(done) {
            loadFeed(0, function() { //activate the feed
                firstFeed = $('.entry:eq(0)').text();
                done();
            });
        });

        it("New Feed is loaded", function(done) {

            loadFeed(1, function() { //activate the feed
                feedNew = $('.entry:eq(0)').text();
                expect(firstFeed).not.toEqual(feedNew);
                done();
            });
        });
    });

}());
