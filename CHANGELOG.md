# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0](https://github.com/unzerdev/nodejs-sdk/compare/6e0de48882482e428500bad68c812a504104e283..develop)

### Added
* Release for re-branding SDK.

### Changed
* `Heidelpay` in class names got replaced by `Unzer`
* Replace payment methods `Guranteed/Factoring` by `Secured`
  | Current   | Replaced by |
  | ------------- | ------------- |
  | SepaDirectDebitGuaranteed  | SepaDirectDebitSecured  |
  | InvoiceGuaranteed  | InvoiceSecured  |
  | InvoiceFactoring  | InvoiceSecured  |
  | HirePurchase  | InstallmentSecured  |


### Removed
* Remove payment methods.
  * SepaDirectDebitGuaranteed
  * InvoiceGuaranteed
  * InvoiceFactoring
  * HirePurchase  
