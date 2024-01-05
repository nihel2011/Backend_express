const request = require("supertest");
const app = require("./app")

describe("Express API",() => {
    it('GET /allblogs--> arrays blogs',()=>{
        return request(app)
            .get('/allblogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then((response)=>{
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            titre: expect.any(String),
                            description: expect.any(String)
                        })
                    ])
                );
            })
    })
    it('GET /blog/id --> specific blog by id',()=>{
        return request(app)
            .get('/blog/6582e4a82737f39dc7f82dc1')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then((response)=>{
                expect(response.body).toEqual(
                        expect.objectContaining({
                            titre: expect.any(String),
                            description: expect.any(String)
                        })
                );
            })

    });
    // tester si l'id n'existe pas
    it('GET /blog/id --> 404 it not found',()=>{
        return request(app).get('/blog/9999999999999').expect(404)
        

    });
    it('POST /addblog --> Created blog',()=>{
        return request(app).post('/addblog').send({
            titre : "titre exemple",
            description:"tester les routes"
        }).expect('Content-Type', 'application/json; charset=utf-8').expect(201)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    result : expect.any(String)
                })
            )

        })

    });

    // it('POST /addblog --> validate blog',()=>{
    //     return request(app).post('/addblog').send({titre : 123})
    //     .expect(422)

    // });
})