/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : h5db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-05-21 10:55:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `psw` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('30', 'happigo13397518026', '13397518026', 'a123456');
INSERT INTO `user` VALUES ('28', 'happigo14766084713', '14766084713', '1234567');
INSERT INTO `user` VALUES ('29', 'happigo18566084713', '18566084713', '1234567');
INSERT INTO `user` VALUES ('26', 'happigo13039306535', '13039306535', '1234567');
SET FOREIGN_KEY_CHECKS=1;
