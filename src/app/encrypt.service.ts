import { Injectable } from '@angular/core';
import{ KEYUTIL, KJUR, hextob64 } from  'jsrsasign';

@Injectable()
export class EncryptService {

  private validPropertiesToEncrypt;
  private key;

  constructor() {
    // useSimpleModule is false if and only if window.location.href = "...&simple=false..."
    // useSimpleModule is true if no "simple" or if "simple=true" or if "simple=anything"

    // for now, set useSimpleModule to true
     let useSimpleModule = true;
     this.validPropertiesToEncrypt = useSimpleModule ? ['source.jdbc.schema', 'source.user', 'source.password', 'source.jdbc.jdbcUrl', 'source.srcUrl.sourceUrl'] : ['dataSource.0.schema', 'dataSource.0.user', 'dataSource.0.password', 'dataSource.0.jdbc.jdbcUrl', 'dataSource.0.csvUrl'];
     console.log("validPropertiesToEncrypt:");
     console.log(this.validPropertiesToEncrypt);
  }

  setKey(key) {
    this.key = key;
  }

  encryptModuleInfo(module) : string {
    var sampleProtectedModule = JSON.parse(JSON.stringify(module));
    return this.encryptObject(sampleProtectedModule, null);
  }

  encryptObject(obj, name) : string {
    let self = this;
    Object.keys(obj).forEach(function(key) {
      var fullKey = name ? name + '.' + key : key;
      if (typeof obj[key] === 'object') {
        // encrypt the child object
        self.encryptObject(obj[key], fullKey);
      } else if (self.validPropertiesToEncrypt.indexOf(fullKey) !== -1) {
        obj[key] = self.encryptValue(obj[key]);
      }
    });
    return obj;
  }

  encryptValue(value) : string {
    var keyObj = KEYUTIL.getKey(this.key);//this.session.keys[0]);//sessionObj.keys[0]);
    var hex = KJUR.crypto.Cipher.encrypt(value, keyObj);

    return '{enc}' + hextob64(hex);
  }

  /*
    getUrlParam(name) : string {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return (results === null) ? '' : results[1];
    }
  */


}
