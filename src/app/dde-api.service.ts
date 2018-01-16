import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import{ KEYUTIL } from  'jsrsasign';

@Injectable()
export class DdeApiService {

  constructor() {

     // useSimpleModule is false if and only if window.location.href = "...&simple=false..."
     // useSimpleModule is true if no "simple" or if "simple=true" or if "simple=anything"

     // for now, set useSimpleModule to true
      let useSimpleModule = true;
      this.validPropertiesToEncrypt = useSimpleModule ? ['source.jdbc.schema', 'source.user', 'source.password', 'source.jdbc.jdbcUrl', 'source.srcUrl.sourceUrl'] : ['dataSource.0.schema', 'dataSource.0.user', 'dataSource.0.password', 'dataSource.0.jdbc.jdbcUrl', 'dataSource.0.csvUrl'];
      console.log("validPropertiesToEncrypt:");
      console.log(this.validPropertiesToEncrypt);
  }

  private dashboardAPI;
  private validPropertiesToEncrypt;

  setDashboardApi(dashboardAPI) {
    this.dashboardAPI = dashboardAPI;
    console.log(this.dashboardAPI);
  }

  addDb2SampleSource(db2_sample_module) {
    this.dashboardAPI.addSources([{
      module: db2_sample_module,
      name: 'Test DB2 Source',
      id: 'myUniqueId123'
    }]);
  }

  addCSVSampleSource(csv_sample_module) {
    this.dashboardAPI.addSources([{
      module: csv_sample_module,
      name: 'Test CSV Source',
      id: 'myUniqueId789'
    }]);
  }

/*
  addProtectedDb2SampleSource(db2_sample_module) {
    var protectedSampleModule = this.getProtectedSampleModule(db2_sample_module);
    console.log("protected sample module: " + protectedSampleModule);
    this.dashboardAPI.addSources([{
      module: protectedSampleModule,
      name: 'Protected DB2 Source',
      id: 'myUniqueId456'
    }]);
  }

  getProtectedSampleModule(sampleModule) :  string {
    return this._encryptModuleInfo(sampleModule);
  }

  _encryptModuleInfo(module) : string {
    var sampleProtectedModule = JSON.parse(JSON.stringify(module));
    return this._encryptObject(sampleProtectedModule, null);
  }

  _encryptObject(obj, name) : string {
    Object.keys(obj).forEach(function(key) {
      var fullKey = name ? name + '.' + key : key;
      if (typeof obj[key] === 'object') {
        // encrypt the child object
        this._encryptObject(obj[key], fullKey);
      } else if (this.validPropertiesToEncrypt.indexOf(fullKey) !== -1) {
        obj[key] = this._encryptValue(obj[key]);
      }
    });
    return obj;
  }

  _encryptValue(value) : string {
    var keyObj = KEYUTIL.getKey(sessionObj.keys[0]);
    var hex = KJUR.crypto.Cipher.encrypt(value, keyObj);

    return '{enc}' + hextob64(hex);
  }

  getUrlParam(name) : string {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return (results === null) ? '' : results[1];
  }
*/
}
