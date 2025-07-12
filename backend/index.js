const analyticsRoutes = require("./routes/analytics");
app.use("/api/analytics", analyticsRoutes);

const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);
