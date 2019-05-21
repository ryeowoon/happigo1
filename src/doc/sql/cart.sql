/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : h5db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-05-21 10:54:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `goodsid` int(11) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `goodspic` varchar(255) DEFAULT NULL,
  `originprice` decimal(10,2) DEFAULT NULL,
  `currentprice` decimal(10,2) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `stocknum` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('62', 'happigo18566084713', '1452', '个护美妆name4', '1.jpg', '1151.00', '551.00', '1', '203');
INSERT INTO `cart` VALUES ('61', 'happigo18566084713', '1330', '服装配饰name10', '1.jpg', '1037.00', '437.00', '1', '89');
INSERT INTO `cart` VALUES ('50', 'happigo13039783455', '1326', '服装配饰name6', '1.jpg', '1033.00', '433.00', '1', '85');
INSERT INTO `cart` VALUES ('49', 'happigo13039783455', '1326', '服装配饰name6', '1.jpg', '1033.00', '433.00', '1', '85');
INSERT INTO `cart` VALUES ('48', 'happigo13039783455', '1326', '服装配饰name6', '1.jpg', '1033.00', '433.00', '1', '85');
INSERT INTO `cart` VALUES ('47', 'happigo13039783455', '1326', '服装配饰name6', '1.jpg', '1033.00', '433.00', '1', '85');
SET FOREIGN_KEY_CHECKS=1;
