const { MongoClient } = require('mongodb');

async function setupDatabase() {
    
    const uri = 'mongodb://localhost:27017';

    
    const dbName = 'student_database';

    
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        
        await client.connect();
        console.log('Connected to the database');

        
        const db = client.db(dbName);
        const academicRecordsCollection = db.collection('academic_records');
        const coCurricularActivitiesCollection = db.collection('co_curricular_activities');

        
        const academicRecord = {
            studentId: 1,
            name: 'John Doe',
            grades: { math: 85, science: 90, history: 75 },
            subjects: ['math', 'science', 'history']
        };

        const coCurricularActivity = {
            studentId: 1,
            name: 'John Doe',
            activityType: 'sports',
            duration: '2 years',
            achievements: ['1st place in football tournament']
        };

        
        await academicRecordsCollection.insertOne(academicRecord);
        await coCurricularActivitiesCollection.insertOne(coCurricularActivity);

        const academicRecordResult = await academicRecordsCollection.findOne({ studentId: 1 });
        console.log('Academic Record:', academicRecordResult);

        const coCurricularActivityResult = await coCurricularActivitiesCollection.findOne({ studentId: 1 });
        console.log('Co-curricular Activity:', coCurricularActivityResult);

        
        await academicRecordsCollection.updateOne({ studentId: 1 }, { $set: { grades: { math: 90, science: 95, history: 80 } } });
        const updatedAcademicRecord = await academicRecordsCollection.findOne({ studentId: 1 });
        console.log('Updated Academic Record:', updatedAcademicRecord);

       
        await academicRecordsCollection.deleteOne({ studentId: 1 });
        await coCurricularActivitiesCollection.deleteOne({ studentId: 1 });

        console.log('Sample data deleted');
    } finally {
        
        await client.close();
        console.log('Connection closed');
    }
}


setupDatabase().catch(console.error);