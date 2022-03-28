let numItem = document.querySelectorAll('.number-item');
let optItem = document.querySelectorAll('.item-red');
let iptCalcKecil = document.querySelector('.result-input-kecil');
let iptCalcBesar = document.querySelector('.result-input-besar');
let removeAllItem = document.querySelector('.remove-all-item');
let removeOneItem = document.querySelector('.remove-one-item');
let resultItem = document.querySelector('.result-item');

function calculateStr(fn) {
   return new Function('return ' + fn)();
}

function resetIptVal() {
   iptCalcBesar.value = '0';
   iptCalcKecil.value = '0';
}

numItem.forEach((m) => {
   m.addEventListener('click', function () {
      iptNum = m.dataset.value;
      if (iptCalcKecil.value == '0') {
         iptCalcKecil.value = '';
      }

      iptCalcKecil.value += iptNum;

      if (iptCalcKecil.value == '00' || iptCalcKecil.value == '000') {
         iptCalcKecil.value = '0';
      }
   });
});

function iptPersen() {
   iptCalcKecil.value = calculateStr(iptCalcKecil.value);
   iptCalcBesar.value = calculateStr(iptCalcKecil.value);
   document.querySelector('.btn-copy').style.display = 'flex';
}

optItem.forEach((m) => {
   let opt = m.dataset.value;

   m.addEventListener('click', function () {
      const optReg = /[+*\/-]/g;
      let matchWithOpt = iptCalcKecil.value.match(optReg);

      if (matchWithOpt == null) {
         iptCalcKecil.value += opt;
         if (iptCalcKecil.value.match('/100')) {
            iptPersen();
            DisplayRiwayatCode();
         }
      } else {
         if (iptCalcKecil.value.slice(-1).match(optReg)) {
            let removeIptOpt = iptCalcKecil.value.split('').reverse().join('').substr(1, iptCalcKecil.value.length);

            iptCalcKecil.value = removeIptOpt.split('').reverse().join('');

            iptCalcKecil.value += opt;

            if (iptCalcKecil.value.match('/100')) {
               iptPersen();
               DisplayRiwayatCode();
               matchWithOpt = null;
            }
            matchWithOpt = null;
         } else {
            iptCalcKecil.value += opt;
            if (iptCalcKecil.value.match('/100')) {
               iptPersen();
               DisplayRiwayatCode();
               matchWithOpt = null;
            }
            matchWithOpt = null;
         }
      }
   });
});

removeAllItem.addEventListener('click', function () {
   resetIptVal();
   document.querySelector('.btn-copy').style.display = 'none';
});

removeOneItem.addEventListener('click', function () {
   if (iptCalcKecil.value == '0' || iptCalcKecil.value == '0.') {
      document.querySelector('.btn-copy').style.display = 'none';
      resetIptVal();
   } else {
      let iptVal = iptCalcKecil.value;
      if (iptVal.length == 1) {
         resetIptVal();
         document.querySelector('.btn-copy').style.display = 'none';
      } else {
         iptVal = iptVal.split('').reverse().join('').substr(1, iptVal.length);
         iptCalcKecil.value = iptVal.split('').reverse().join('');
      }
   }
});

const iptCalcArr = [];

resultItem.addEventListener('click', function () {
   const iptOutput = iptCalcKecil.value;
   const optReg = /[+*\/-]/g;

   if (iptOutput.slice(-1).match(optReg)) {
      let errorText = `ERROR\n${iptOutput}?\nPERSAMAAN TIDAK LENGKAP !`;

      alert(errorText);
      resetIptVal();

      document.querySelector('.btn-copy').style.display = 'none';
   } else {
      let result = calculateStr(iptOutput);
      iptCalcBesar.value = result;
      document.querySelector('.btn-copy').style.display = 'flex';
   }
});
