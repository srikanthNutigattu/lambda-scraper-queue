import assert from 'assert'
import supertest from 'supertest'
import { apiUrl } from '../../lib/cloudFormation'
import { expect } from 'chai'
import { handler } from './index'

export function local () {

  describe('Worker', function () {

    this.timeout(5000)

    it('should process the job', function (done) {
      const event = {
        Records: [
          {
            dynamodb: {
              NewImage: {
                jobRef: {
                  S: '2016/03/02/23:21-KqXArbOZTuiL2vFyixAl_g'
                },
                url: {
                  S: 'http://jimpick.com/'
                }
              }
            }
          }
        ]
      }
      event.quiet = true
      event.dryRun = true // FIXME: We should mock the HTTP and AWS calls
      handler(event, {
        done: (error, body) => {
          done()
        },
        fail: error => {
          console.log(error)
        }
      })
    })

  })

}
