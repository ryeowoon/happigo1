/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : h5db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-05-21 10:55:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usermsg
-- ----------------------------
DROP TABLE IF EXISTS `usermsg`;
CREATE TABLE `usermsg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `level` int(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usermsg
-- ----------------------------
INSERT INTO `usermsg` VALUES ('1', '张三', 'user_center_img4.jpg', '默认好评', '5', '2019-05-19 12:39:51');
INSERT INTO `usermsg` VALUES ('2', '张三', 'user_center_img4.jpg', '默认好评', '5', '2019-05-19 12:39:53');
INSERT INTO `usermsg` VALUES ('3', '张三', 'user_center_img4.jpg', '默认好评', '5', '2019-05-19 12:39:56');
INSERT INTO `usermsg` VALUES ('4', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:39:59');
INSERT INTO `usermsg` VALUES ('5', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:01');
INSERT INTO `usermsg` VALUES ('6', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:04');
INSERT INTO `usermsg` VALUES ('7', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:06');
INSERT INTO `usermsg` VALUES ('8', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:08');
INSERT INTO `usermsg` VALUES ('9', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:18');
INSERT INTO `usermsg` VALUES ('10', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:23');
INSERT INTO `usermsg` VALUES ('11', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:25');
INSERT INTO `usermsg` VALUES ('12', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:28');
INSERT INTO `usermsg` VALUES ('13', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:31');
INSERT INTO `usermsg` VALUES ('14', '张三', 'user_center_img4.jpg', '默认好评', '4', '2019-05-19 12:40:37');
SET FOREIGN_KEY_CHECKS=1;
