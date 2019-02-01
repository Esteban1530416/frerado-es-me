<?php
/**
* @package		EasySocial
* @copyright	Copyright (C) 2010 - 2013 Stack Ideas Sdn Bhd. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* EasySocial is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' );
?>
<?php echo $names; ?> <?php echo JText::_( 'APP_SHARES_SHARED' ); ?>
<?php if( !$creator->isBlock() ) { ?>
	<a href="<?php echo $creator->getPermalink();?>" alt="<?php echo $this->html( 'string.escape' , $creator->getName() );?>"><?php echo $creator->getName(); ?></a><?php echo JText::_( 'APP_SHARES_SHARED_ALBUM' ); ?>
<?php } else { ?>
	<?php echo $creator->getName(); ?><?php echo JText::_( 'APP_SHARES_SHARED_PHOTO' ); ?>
<?php } ?>
